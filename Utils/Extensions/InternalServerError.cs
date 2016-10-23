using Microsoft.AspNetCore.Mvc;

namespace FoodPlan.Utils.Extensions
{
    public static class HttpStatusCodes
    {
        public static StatusCodeResult InternalServerError(this Controller controller)
        {
            return new StatusCodeResult(500);
        }
    }
}