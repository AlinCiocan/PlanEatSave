using System;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using PlanEatSave.DataAceessLayer;
using PlanEatSave.Models;
using PlanEatSave.Utils;
using PlanEatSave.Utils.Extensions;

namespace PlanEatSave.Controllers
{
    public class PantryController : Controller
    {

        private PantryService _pantryService;
        private ILogger<PantryController> _logger;
        public string UserId
        {
            get
            {
                return this.GetUserId();
            }
        }

        public PantryController(PantryService pantryService, ILogger<PantryController> logger)
        {
            _pantryService = pantryService;
            _logger = logger;
        }

        [HttpGet]
        public async Task<IActionResult> GetPantry()
        {
            var pantry = await _pantryService.GetPantryByUserIdAsync(UserId);
            return Ok(Mapper.Map<PantryViewModel>(pantry));
        }

        [HttpPost]
        public async Task<IActionResult> AddItem([FromBody] PantryItemViewModel item)
        {
            try
            {
                var newItem = Mapper.Map<PantryItem>(item);
                if (await _pantryService.AddItem(UserId, newItem))
                {
                    return Ok(Mapper.Map<PantryItemViewModel>(newItem));
                }
                return Forbid("You do not have access to this pantry");
            }
            catch (Exception ex)
            {
                _logger.LogError(LoggingEvents.PANTRY_ADD_ITEM, ex, $"Add item failed; user id - {UserId}; item - {JsonConvert.SerializeObject(item)}");
                return this.InternalServerError();
            }

        }
    }
}