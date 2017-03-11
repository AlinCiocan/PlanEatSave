using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
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
            catch(Exception ex) 
            {
                _logger.LogError(LoggingEvents.MEALS_ADD_MEAL_FROM_EXISTING_RECIPE, ex, $"Add meal from existing recipe failed; user id - {UserId}; meal view model - {JsonConvert.SerializeObject(mealViewModel)}");
                return this.InternalServerError();
            }
        }
    }
}