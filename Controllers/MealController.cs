using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using PlanEatSave.Constants;
using PlanEatSave.DataAceessLayer;
using PlanEatSave.Exceptions;
using PlanEatSave.Models;
using PlanEatSave.Models.RecipeModels;
using PlanEatSave.Models.Responses;
using PlanEatSave.Utils;
using PlanEatSave.Utils.Extensions;

namespace PlanEatSave.Controllers
{
    public class MealController : Controller
    {
        private MealService _mealService;
        private ILogger<MealController> _logger;
        public string UserId
        {
            get
            {
                return this.GetUserId();
            }
        }

        public MealController(MealService mealService, ILogger<MealController> logger)
        {
            _mealService = mealService;
            _logger = logger;
        }

        [HttpPost]
        public async Task<IActionResult> AddMealFromExistingRecipe([FromBody] AddMealViewModel mealViewModel)
        {
            try
            {
                var meal = Mapper.Map<Meal>(mealViewModel);
                await _mealService.AddMealFromExistingRecipe(UserId, meal);
                return Ok(meal.Id);
            }
            catch (Exception ex)
            {
                _logger.LogError(LoggingEvents.MEALS_ADD_MEAL_FROM_EXISTING_RECIPE, ex, $"Add meal from existing recipe failed; user id - {UserId}; meal view model - {JsonConvert.SerializeObject(mealViewModel)}");
                return this.InternalServerError();
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetMeals(DateTime startDate, DateTime endDate)
        {
            if(startDate > endDate) 
            {
                return BadRequest("End date cannot be earlier than start date.");
            }

            if(endDate.Subtract(startDate).Days + 1 > MealConstants.MAX_NUMBER_OF_MEALS_RETRIEVED_DAYS) 
            {
                return BadRequest("The difference between start date and end date is too much.");
            }

            var startDateUtc = DateTime.SpecifyKind(startDate.Date, DateTimeKind.Utc);
            var endDateUtc = DateTime.SpecifyKind(endDate.Date, DateTimeKind.Utc);

            try
            {
                var days = await _mealService.GetMeals(UserId, startDateUtc, endDateUtc);
                return Ok(days);
            }
            catch (Exception ex)
            {
                _logger.LogError(LoggingEvents.MEALS_RETRIEVE_MEALS, ex, $"Retrieve meals failed; user id - {UserId}; start date - ${startDate}; end date - ${endDate}");
                return this.InternalServerError();
            }
        }


        [HttpDelete]
        public async Task<IActionResult> RemoveMeal(string mealId)
        {
            try
            {
                if(await _mealService.RemoveMeal(mealId, UserId)) 
                {
                    return Ok(new RemoveResponse { IsSuccess = true });
                }

                return Ok(new RemoveResponse { IsSuccess = false, Message = "This meal does not exist" });
            }
            catch (ForbiddenAccessException ex)
            {
                _logger.LogDebug(LoggingEvents.MEALS_REMOVE_MEAL, ex, $"The user with id - {UserId} from IP - {HttpContext.Connection.RemoteIpAddress} tried to remove a meal that was not his.");
                return Forbid("You are not allowed to remove this meal");
            }

            catch (Exception ex)
            {
                _logger.LogError(LoggingEvents.MEALS_REMOVE_MEAL, ex, $"Remove meal failed; user id - {UserId}; meal id - ${mealId}");
                return this.InternalServerError();
            }
        }
    }
}