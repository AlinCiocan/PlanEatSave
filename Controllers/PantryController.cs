using System;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using PlanEatSave.DataAceessLayer;
using PlanEatSave.Exceptions;
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
                return await InsertOrUpdateItem(item);
            }
            catch (Exception ex)
            {
                _logger.LogError(LoggingEvents.PANTRY_ADD_ITEM, ex, $"Add item failed; user id - {UserId}; item - {JsonConvert.SerializeObject(item)}");
                return this.InternalServerError();
            }

        }

        [HttpPut]
        public async Task<IActionResult> UpdateItem([FromBody] PantryItemViewModel item)
        {
            try
            {
                return await InsertOrUpdateItem(item);
            }
            catch (Exception ex)
            {
                _logger.LogError(LoggingEvents.PANTRY_ADD_ITEM, ex, $"Update item failed; user id - {UserId}; item - {JsonConvert.SerializeObject(item)}");
                return this.InternalServerError();
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetItemById(long id)
        {
            try
            {
                var item = await _pantryService.GetItemById(UserId, id);
                return Ok(Mapper.Map<PantryItemViewModel>(item));
            }
            catch (ForbiddenAccessException ex)
            {
                _logger.LogDebug(LoggingEvents.PANTRY_RETRIEVE_ITEM, ex, $"The user with id - {UserId} from IP - {HttpContext.Connection.RemoteIpAddress} tried to access an item that was not in his pantry.");
                return Forbid();
            }
            catch (Exception ex)
            {
                _logger.LogError(LoggingEvents.PANTRY_RETRIEVE_ITEM, ex, $"Retrieve item failed; user id - {UserId}; item id - {id}");
                return this.InternalServerError();
            }

        }

        [HttpDelete]
        public async Task<IActionResult> RemoveItem(long id)
        {
            try
            {
                if (await _pantryService.RemoveItemById(UserId, id))
                {
                    return Ok(new PantryRemoveResponse { IsSuccess = true });
                }

                return Ok(new PantryRemoveResponse { IsSuccess = false, Message = "This item does not exist" });
            }
            catch (ForbiddenAccessException ex)
            {
                _logger.LogDebug(LoggingEvents.PANTRY_REMOVE_ITEM, ex, $"The user with id - {UserId} from IP - {HttpContext.Connection.RemoteIpAddress} tried to remove an item that was not in his pantry.");
                return Forbid("You are not allowed to remove this item");
            }
            catch (Exception ex)
            {
                _logger.LogError(LoggingEvents.PANTRY_REMOVE_ITEM, ex, $"Remove item failed; user id - {UserId}; item id - {id}");
                return this.InternalServerError();

            }
        }

        private async Task<IActionResult> InsertOrUpdateItem(PantryItemViewModel item)
        {
            var insertOrUpdateItem = Mapper.Map<PantryItem>(item);
            if (await _pantryService.InsertOrUpdate(UserId, insertOrUpdateItem))
            {
                return Ok(Mapper.Map<PantryItemViewModel>(insertOrUpdateItem));
            }
            return Forbid("You do not have access to this pantry");
        }
    }
}