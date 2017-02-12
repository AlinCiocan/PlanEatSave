using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using PlanEatSave.DataAceessLayer;
using PlanEatSave.Models;
using System;
using PlanEatSave.Utils;
using Microsoft.AspNetCore.Identity;
using PlanEatSave.Utils.Extensions;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using Microsoft.AspNetCore.Authorization;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.Extensions.Logging;
using PlanEatSave.Models.UserModels;
using AutoMapper;
using PlanEatSave.Models.LoginModels;

namespace PlanEatSave.Controllers
{
    public class AccountController : Controller
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ILogger<AccountController> _logger;
        private readonly JsonSerializerSettings _serializerSettings;
        private readonly JwtIssuerOptions _jwtOptions;
        public AccountController(UserManager<ApplicationUser> userManager, IOptions<JwtIssuerOptions> jwtOptions, ILogger<AccountController> logger)
        {
            _userManager = userManager;
            _logger = logger;
            _jwtOptions = jwtOptions.Value;

            // TODO: make sure to put these settings in only one place
            _serializerSettings = new JsonSerializerSettings
            {
                Formatting = Formatting.Indented,
                ContractResolver = new CamelCasePropertyNamesContractResolver()
            };
        }

        [HttpGet]
        public async Task<IActionResult> UserInfo() 
        {
            var userId = this.GetUserId();
            var userFromDatabase = await _userManager.FindByIdAsync(userId);
            return Ok(Mapper.Map<UserModel>(userFromDatabase));
        }


        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> Login([FromBody] UserLoginModel user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest($"{this.GetModelStateAllErrors()}");
            }

            string userId;
            try
            {
                userId = await GetUserIdByEmailAndPassword(user);

                if (userId == null)
                {
                    return BadRequest("Invalid email address and/or password");
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(LoggingEvents.ACCOUNT_LOGIN, ex, $"Login exception for user with email - '{user.Email}'");
                return this.InternalServerError();
            }

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, userId),
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                new Claim(JwtRegisteredClaimNames.Jti, await _jwtOptions.JtiGenerator()),
                new Claim(
                            JwtRegisteredClaimNames.Iat,
                            ToUnixEpochDate(_jwtOptions.IssuedAt).ToString(),
                            ClaimValueTypes.Integer64
                        )
            };

            // Create the JWT security token and encode it.
            var jwt = new JwtSecurityToken(
                issuer: _jwtOptions.Issuer,
                audience: _jwtOptions.Audience,
                claims: claims,
                notBefore: _jwtOptions.NotBefore,
                expires: _jwtOptions.Expiration,
                signingCredentials: _jwtOptions.SigningCredentials);

            try
            {
                var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

                // Serialize and return the response
                var response = new
                {
                    access_token = encodedJwt,
                    expires_in = (int)_jwtOptions.ValidFor.TotalSeconds
                };

                //var json = JsonConvert.SerializeObject(response, _serializerSettings);
                return Ok(response);
            }
            catch (Exception ex)
            {
                _logger.LogError(LoggingEvents.ACCOUNT_LOGIN ,ex, "Could not generate JWT Token");
                return this.InternalServerError(); // TODO: add the following error message - "There was an issue with login. Please try again later!"
            }
        }

        /// <returns>Date converted to seconds since Unix epoch (Jan 1, 1970, midnight UTC).</returns>
        private static long ToUnixEpochDate(DateTime date)
        {
            return (long)Math.Round((date.ToUniversalTime() -
                           new DateTimeOffset(1970, 1, 1, 0, 0, 0, TimeSpan.Zero))
                          .TotalSeconds);
        }

        private async Task<string> GetUserIdByEmailAndPassword(UserLoginModel user)
        {
            var userFromDb = await _userManager.FindByEmailAsync(user.Email);
            if (userFromDb == null)
            {
                return null;
            }
            if (await _userManager.CheckPasswordAsync(userFromDb, user.Password) == false)
            {
                return null;
            }

            return userFromDb.Id;
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> Register([FromBody] UserRegisterModel user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest($"{this.GetModelStateAllErrors()}");
            }

            try
            {
                var applicationUser = new ApplicationUser
                {
                    Email = user.Email,
                    UserName = user.Email
                };

                var userFromDatabase = await _userManager.FindByEmailAsync(applicationUser.Email);
                if (userFromDatabase != null)
                {
                    return BadRequest("Email address already registered");
                }

                var result = await _userManager.CreateAsync(applicationUser, user.Password);
                if (!result.Succeeded)
                {
                    _logger.LogError(LoggingEvents.ACCOUNT_REGISTER, $"Failed registration for user with email '{user.Email}' and password '{user.Password}'. Error messages: {string.Join(",", result.Errors)}");
                    return BadRequest("Your registration could not be completed. Please refer to an admin of the site to help you");
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
                _logger.LogError(LoggingEvents.ACCOUNT_REGISTER, ex, $"Registration failed for user '{user.Email}' with password '{user.Password}'");
                return this.InternalServerError();
            }
        }
    }
}