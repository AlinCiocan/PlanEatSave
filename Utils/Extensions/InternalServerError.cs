using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using Microsoft.AspNetCore.Mvc;

namespace PlanEatSave.Utils.Extensions
{
    public static class ControllerExtensions
    {
        public static StatusCodeResult InternalServerError(this Controller controller)
        {
            return new StatusCodeResult(500);
        }

        public static string GetModelStateAllErrors(this Controller controller)
        {
            return string.Join("  ",
                    controller.ModelState.Values
                    .Where(e => e.Errors.Count > 0)
                    .SelectMany(e => e.Errors)
                    .Select(e => e.ErrorMessage)
                    .ToArray());
        }

        public static string GetUserId(this Controller controller)
        {
            var jwtCubClaim = controller.ControllerContext.HttpContext.User.FindFirst(claim => claim.Type == JwtRegisteredClaimNames.Sub);
            return jwtCubClaim.Value;
        }
    }

}