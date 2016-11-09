using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PlanEatSave.DataAceessLayer;

namespace PlanEatSave.Controllers
{
    public class PantryController : Controller
    {
        private PantryService _pantryService;
        public PantryController (PantryService pantryService)
        {
            _pantryService = pantryService;
        }
        [HttpGet]
        public IActionResult GetPantry(int userId)
        {
            return Ok("item1, item2, item3");
        }
    }
}