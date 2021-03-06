using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using MySQL.Data.Entity.Extensions;
using PlanEatSave.DataAceessLayer;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Authorization;
using PlanEatSave.Models;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using AutoMapper;
using System.IO;
using PlanEatSave.Models.UserModels;
using PlanEatSave.Models.RecipeModels;
using Newtonsoft.Json;
using PlanEatSave.Models.PantryModels;

namespace PlanEatSave
{
    public class Startup
    {
        private SymmetricSecurityKey _signingKey;
        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true, reloadOnChange: true)
                .AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        public IConfigurationRoot Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // Add framework services.
            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy",
                    builder => builder
                        .AllowAnyOrigin()
                        .AllowAnyMethod()
                        .AllowAnyHeader()
                        .AllowCredentials());
            });

            Mapper.Initialize(cfg =>
            {
                cfg.CreateMap<Pantry, PantryViewModel>().ReverseMap();
                cfg.CreateMap<PantryItem, PantryItemViewModel>().ReverseMap();
                cfg.CreateMap<UserModel, ApplicationUser>().ReverseMap();

                cfg.CreateMap<Recipe, RecipeViewModel>()
                   .ForMember(recipeViewModel => recipeViewModel.Ingredients, configuration => configuration.MapFrom(recipe => JsonConvert.DeserializeObject<List<string>>(recipe.IngredientsJson)));

                cfg.CreateMap<RecipeViewModel, Recipe>()
                    .ForMember(recipe => recipe.IngredientsJson, configuration => configuration.MapFrom(recipeViewModel => JsonConvert.SerializeObject(recipeViewModel.Ingredients)));

                cfg.CreateMap<Meal, AddMealViewModel>().ReverseMap();

            });

            services
                .AddMvc(config =>
                {
                    var policy = new AuthorizationPolicyBuilder()
                        .RequireAuthenticatedUser()
                        .Build();
                    config.Filters.Add(new AuthorizeFilter(policy));
                })
                .AddJsonOptions(options =>
                {
                    options.SerializerSettings.DateTimeZoneHandling = DateTimeZoneHandling.Utc;
                    options.SerializerSettings.DateFormatHandling = DateFormatHandling.IsoDateFormat;
                });

            services.AddIdentity<ApplicationUser, IdentityRole>()
                    .AddEntityFrameworkStores<ApplicationDbContext>();
            var jwtAppSettingOptions = Configuration.GetSection(nameof(JwtIssuerOptions));

            // Configure JwtIssuerOptions
            //TODO: Make sure to put this variable in a config & keep it safe
            string SecretKey = Configuration["SecretKey"];
            Console.WriteLine($"Secret key: {SecretKey}");
            _signingKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(SecretKey));

            services.Configure<JwtIssuerOptions>(options =>
            {
                options.Issuer = jwtAppSettingOptions[nameof(JwtIssuerOptions.Issuer)];
                options.Audience = jwtAppSettingOptions[nameof(JwtIssuerOptions.Audience)];
                options.SigningCredentials = new SigningCredentials(_signingKey, SecurityAlgorithms.HmacSha256);
            });

            // Add application services
            services.AddTransient<PantryService, PantryService>();
            services.AddTransient<RecipeService, RecipeService>();
            services.AddTransient<MealService, MealService>();

            services.Configure<IdentityOptions>(options =>
           {
               // Password settings
               options.Password.RequireDigit = false;
               options.Password.RequiredLength = 6;
               options.Password.RequireNonAlphanumeric = false;
               options.Password.RequireUppercase = false;
               options.Password.RequireLowercase = false;

               // User settings
               options.User.RequireUniqueEmail = true;
           });

            var sqlConnectionString = Configuration["ConnectionStrings:DataAccessMySqlProvider"];
            Console.WriteLine($"sql conn from config file: {sqlConnectionString}");

            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseMySQL(sqlConnectionString)
            );

            string currentDirectory = Directory.GetCurrentDirectory();
            Console.WriteLine($"Current directory: {currentDirectory}");
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseCors("CorsPolicy");

            app.UseDefaultFiles();
            app.UseStaticFiles();

            var tokenValidationParameters = CreateTokenValidationParameters();
            app.UseJwtBearerAuthentication(new JwtBearerOptions
            {
                AutomaticAuthenticate = true,
                AutomaticChallenge = true,
                TokenValidationParameters = tokenValidationParameters
            });


            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "Default",
                    template: "api/{controller}/{action}/{id?}"
                );
            });
        }

        private TokenValidationParameters CreateTokenValidationParameters()
        {
            var jwtAppSettingOptions = Configuration.GetSection(nameof(JwtIssuerOptions));
            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidIssuer = jwtAppSettingOptions[nameof(JwtIssuerOptions.Issuer)],

                ValidateAudience = true,
                ValidAudience = jwtAppSettingOptions[nameof(JwtIssuerOptions.Audience)],

                ValidateIssuerSigningKey = true,
                IssuerSigningKey = _signingKey,

                RequireExpirationTime = true,
                ValidateLifetime = true,

                ClockSkew = TimeSpan.Zero
            };
            return tokenValidationParameters;
        }
    }
}
