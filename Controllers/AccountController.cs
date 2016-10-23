using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using FoodPlan.DataAceessLayer;
using FoodPlan.Models;
using System;
using FoodPlan.Utils;
using Microsoft.AspNetCore.Identity;
using System.Net;
using FoodPlan.Utils.Extensions;

namespace FoodPlan.Controllers
{
    public class AccountController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;

        private readonly IFoodPlanLogger _logger;
        public AccountController(UserManager<ApplicationUser> userManager, ApplicationDbContext context, IFoodPlanLogger logger)
        {
            _userManager = userManager;
            _context = context;
            _logger = logger;
        }

        [HttpPost]
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