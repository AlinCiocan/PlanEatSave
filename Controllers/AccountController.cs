using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using FoodPlan.DataAceessLayer;
using FoodPlan.Models;
using System;
using FoodPlan.Utils;
using Microsoft.AspNetCore.Identity;
using System.Net;
using FoodPlan.Utils.Extensions;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using Microsoft.AspNetCore.Authorization;

namespace FoodPlan.Controllers
{
    public class AccountController : Controller
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IFoodPlanLogger _logger;
        private readonly JsonSerializerSettings _serializerSettings;
        public AccountController(UserManager<ApplicationUser> userManager, IOptions<JwtIssuerOptions> jwtOptions,, IFoodPlanLogger logger)
        {
            _userManager = userManager;
            _logger = logger;


            // TODO: make sure to put these settings in only one place
            _serializerSettings = new JsonSerializerSettings
            {
                Formatting = Formatting.Indented,
                ContractResolver = new CamelCasePropertyNamesContractResolver() 
            };
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> Login(UserLoginModel user)
        {
            


            return null;
        }

        // TODO: make sure to take care of special cases, like when the email address already exists in database
        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> Register(UserRegisterModel user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid request");
            }

            try
            {
                var applicationUser = new ApplicationUser
                {
                    Email = user.Email,
                    UserName = user.Email
                };

                var result = await _userManager.CreateAsync(applicationUser, user.Password);
                if (!result.Succeeded)
                {
                    return BadRequest();
                }

                var registeredUser = new UserRegisteredModel
                {
                    Email = applicationUser.Email,
                    Id = applicationUser.Id
                };
                return Created($"/api/user/{registeredUser.Id}", registeredUser);
            }
            catch (Exception ex)
            {
                _logger.LogException(ex, $"Registration failed for user '{user.Email}' with password '{user.Password}'");
                return this.InternalServerError();
            }
        }
    }
}