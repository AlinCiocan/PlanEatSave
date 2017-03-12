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

            startDate = startDate.ToUniversalTime();
            endDate = endDate.ToUniversalTime();

            if(startDate > endDate) 
            {
                return BadRequest("End date cannot be earlier than start date.");
            }

            if(endDate.Subtract(startDate).Days + 1 > MealConstants.MAX_NUMBER_OF_MEALS_RETRIEVED_DAYS) 
            {
                return BadRequest("The difference between start date and end date is too much.");
            }

            try
            {
                var days = await _mealService.GetMeals(UserId, startDate, endDate);
                return Ok(days);
            }
            catch (Exception ex)
            {
                _logger.LogError(LoggingEvents.MEALS_RETRIEVE_MEALS, ex, $"Retrieve meals failes; user id - {UserId}; start date - ${startDate}; end date - ${endDate}");
                return this.InternalServerError();
            }
        }
    }
}