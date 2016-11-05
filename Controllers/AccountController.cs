using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using PlanEatSave.DataAceessLayer;
using PlanEatSave.Models;
using System;
using PlanEatSave.Utils;
using Microsoft.AspNetCore.Identity;
using System.Net;
using PlanEatSave.Utils.Extensions;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using Microsoft.AspNetCore.Authorization;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Principal;
using Microsoft.AspNetCore.Cors;

namespace PlanEatSave.Controllers
{
    public class AccountController : Controller
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IPlanEatSaveLogger _logger;
        private readonly JsonSerializerSettings _serializerSettings;
        private readonly JwtIssuerOptions _jwtOptions;
        public AccountController(UserManager<ApplicationUser> userManager, IOptions<JwtIssuerOptions> jwtOptions, IPlanEatSaveLogger logger)
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

        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> Login(UserLoginModel user)
        {
            var identity = await GetClaimsIdentity(user);
            if (identity == null)
            {
                return BadRequest($"Invalid credentials");
            }

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Email),
                new Claim(JwtRegisteredClaimNames.Jti, await _jwtOptions.JtiGenerator()),
                new Claim(
                            JwtRegisteredClaimNames.Iat,
                            ToUnixEpochDate(_jwtOptions.IssuedAt).ToString(),
                            ClaimValueTypes.Integer64
                        ),
                identity.FindFirst("DisneyCharacter")
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

                var json = JsonConvert.SerializeObject(response, _serializerSettings);
                return new OkObjectResult(json);
            }
            catch (Exception ex)
            {
                _logger.LogException(ex, "Could not generate JWT Token");
                return this.InternalServerError(); // TODO: add the following error message - "There was an issue with login. Please try again later!"
            }
        }

        /// <returns>Date converted to seconds since Unix epoch (Jan 1, 1970, midnight UTC).</returns>
        private static long ToUnixEpochDate(DateTime date)
      => (long)Math.Round((date.ToUniversalTime() -
                           new DateTimeOffset(1970, 1, 1, 0, 0, 0, TimeSpan.Zero))
                          .TotalSeconds);

        /// <summary>
        /// IMAGINE BIG RED WARNING SIGNS HERE!
        /// You'd want to retrieve claims through your claims provider
        /// in whatever way suits you, the below is purely for demo purposes!
        /// </summary>

        // TODO: this method should chekc the credentials if they are valid
        private static Task<ClaimsIdentity> GetClaimsIdentity(UserLoginModel user)
        {
            if (user?.Email == "MickeyMouse" &&
                user?.Password == "1234")
            {
                return Task.FromResult(new ClaimsIdentity(
                  new GenericIdentity(user.Email, "Token"),
                  new[]
                  {
            new Claim("DisneyCharacter", "IAmMickey")
                  }));
            }

            // Credentials are invalid, or account doesn't exist
            return Task.FromResult<ClaimsIdentity>(null);
        }


        // TODO: make sure to take care of special cases, like when the email address already exists in database
        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> Register([FromBody] UserRegisterModel user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest($"Invalid request: {this.GetModelStateAllErrors()}");
            }

            try
            {
                var applicationUser = new ApplicationUser
                {
                    Email = user.Email,
                    UserName = user.Email
                };

                var userFromDatabase = await _userManager.FindByEmailAsync(applicationUser.Email);
                if(userFromDatabase != null) 
                {
                    return BadRequest("Email address already registered");
                }

                var result = await _userManager.CreateAsync(applicationUser, user.Password);
                if (!result.Succeeded)
                {
                    _logger.LogError($"Failed registration for user with email '{user.Email}' and password '{user.Password}'. Error messages: {string.Join(",", result.Errors)}");
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
                _logger.LogException(ex, $"Registration failed for user '{user.Email}' with password '{user.Password}'");
                return this.InternalServerError();
            }
        }
    }
}