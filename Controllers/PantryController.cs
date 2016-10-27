using Microsoft.AspNetCore.Mvc;

namespace FoodPlan.Controllers
{
    public class PantryController : Controller
    {
        public IActionResult Items()
        {
            return Ok("item1, item2, item3");
        }
    }
}