using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using PlanEatSave.DataAceessLayer;
using PlanEatSave.Exceptions;
using PlanEatSave.Models.RecipeModels;
using PlanEatSave.Models.Responses;
using PlanEatSave.Utils;
using PlanEatSave.Utils.Extensions;

namespace PlanEatSave.Controllers
{
    public class RecipesController : Controller
    {
        private RecipeService _recipeService;
        private ILogger<PantryController> _logger;
        public string UserId
        {
            get
            {
                return this.GetUserId();
            }
        }

        public RecipesController(RecipeService recipeService, ILogger<PantryController> logger)
        {
            _recipeService = recipeService;
            _logger = logger;
        }

        [HttpPost]
        public async Task<IActionResult> AddRecipe([FromBody] RecipeViewModel recipe)
        {
            try
            {
                return await InsertOrUpdateRecipe(recipe);
            }
            catch (Exception ex)
            {
                _logger.LogError(LoggingEvents.RECIPES_ADD_RECIPE, ex, $"Add recipe failed; user id - {UserId}; recipe - {JsonConvert.SerializeObject(recipe)}");
                return this.InternalServerError();
            }
        }

        [HttpPut]
        public async Task<IActionResult> EditRecipe([FromBody] RecipeViewModel recipe)
        {
            try
            {
                return await InsertOrUpdateRecipe(recipe);
            }
            catch (Exception ex)
            {
                _logger.LogError(LoggingEvents.RECIPES_EDIT_RECIPE, ex, $"Edit recipe failed; user id - {UserId}; recipe - {JsonConvert.SerializeObject(recipe)}");
                return this.InternalServerError();
            }

        }

        [HttpGet]
        public async Task<IActionResult> GetRecipeById(long id)
        {
            try
            {
                var recipe = await _recipeService.RetrieveRecipeById(UserId, id);
                return Ok(Mapper.Map<RecipeViewModel>(recipe));
            }
            catch (Exception ex)
            {
                _logger.LogError(LoggingEvents.RECIPES_RETRIEVE_RECIPE, ex, $"Retrieve recipe failed; user id - {UserId}; recipe id - {id}");
                return this.InternalServerError();
            }
        }

        [HttpGet]
        public async Task<IActionResult> RetrieveAll()
        {
            try
            {
                var recipes = await _recipeService.RetrieveRecipes(UserId);
                return Ok(Mapper.Map<List<RecipeViewModel>>(recipes));
            }
            catch (Exception ex)
            {
                _logger.LogError(LoggingEvents.RECIPES_RETRIEVE_ALL, ex, $"Retrieve recipes failed; user id - {UserId}");
                return this.InternalServerError();
            }
        }

        [HttpDelete]
        public async Task<IActionResult> RemoveRecipe(long id)
        {
            try
            {
                if (await _recipeService.RemoveRecipeById(UserId, id))
                {
                    return Ok(new RemoveResponse { IsSuccess = true });
                }

                return Ok(new RemoveResponse { IsSuccess = false, Message = "This recipe does not exist" });
            }
            catch (ForbiddenAccessException ex)
            {
                _logger.LogDebug(LoggingEvents.PANTRY_REMOVE_ITEM, ex, $"The user with id - {UserId} from IP - {HttpContext.Connection.RemoteIpAddress} tried to remove a recipe that was not in his pantry.");
                return Forbid("You are not allowed to remove this recipe");
            }
            catch (Exception ex)
            {
                _logger.LogError(LoggingEvents.RECIPES_REMOVE_RECIPE, ex, $"Remove recipe failed; user id - {UserId}; recipe id - {id}");
                return this.InternalServerError();

            }
        }

        private async Task<IActionResult> InsertOrUpdateRecipe(RecipeViewModel recipe)
        {
            var insertOrUpdateRecipe = Mapper.Map<Recipe>(recipe);
            if (await _recipeService.InsertOrUpdate(UserId, insertOrUpdateRecipe))
            {
                return Ok(Mapper.Map<RecipeViewModel>(insertOrUpdateRecipe));
            }
            return Forbid("You do not have access to this recipe");
        }
    }
}