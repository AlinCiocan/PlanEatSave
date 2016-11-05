using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace PlanEatSave.Controllers
{
    public class PantryController : Controller
    {
        [HttpGet]
        [AllowAnonymous]
        public IActionResult Items()
        {
            return Ok("item1, item2, item3");
        }
    }
}