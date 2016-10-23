using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using MySQL.Data.Entity.Extensions;
using FoodPlan.DataAceessLayer;

namespace FoodPlan
{
    public class Startup
    {
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
            services.AddMvc();

            var sqlConnectionString = Configuration["ConnectionString:DataAccessMySqlProvider"];
            var sql = @"server=localhost;userid=root;password=1234;database=foodplan;";

            Console.WriteLine("Mysql sql conn: " + sql);
            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseMySQL(sql)
            );
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();

            if (env.IsDevelopment() || true) // TODO: make sure to remove the "true" before in production
            {
                app.UseDeveloperExceptionPage();
            }

            //app.UseIdentityServer();

            app.UseCors((configurationPolicy) =>
            {
                configurationPolicy
                    .AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowCredentials();
            });


            app.UseStaticFiles();

            app.UseMvc(routes => 
            {
                routes.MapRoute(
                    name: "Default",
                    template: "api/{controller}/{action}/{id?}"
                );
            });
        }
    }
}
