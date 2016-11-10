using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using PlanEatSave.DataAceessLayer;
using PlanEatSave.Utils.Extensions;

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
        public async Task<IActionResult> GetPantry()
        {
            string userId = this.GetUserId();
            var pantry = await _pantryService.GetPantryByUserIdAsync(userId);
            return Ok(pantry);
        }
    }
}