using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using PlanEatSave.Exceptions;

namespace PlanEatSave.DataAceessLayer
{
    public class RecipeService
    {
        private ApplicationDbContext _context;
        private ILogger<PantryService> _logger;

        public RecipeService(ApplicationDbContext context, ILogger<PantryService> logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task<bool> InsertOrUpdate(string userId, Recipe recipe)
        {
            recipe.UserId = userId;

            if (recipe.Id == 0)
            {
                _context.Recipes.Add(recipe);
                await _context.SaveChangesAsync();
                return true;
            }


            var recipeFromDatabase = await _context.Recipes.FirstOrDefaultAsync(r => r.Id == recipe.Id && r.UserId == recipe.UserId);
            if (recipeFromDatabase == null)
            {
                return false;
            }

            recipeFromDatabase.Name = recipe.Name;
            recipeFromDatabase.IngredientsJson = recipe.IngredientsJson;
            recipeFromDatabase.Preparation = recipe.Preparation;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<List<Recipe>> RetrieveRecipes(string userId)
        {
            return await _context.Recipes.Where(recipe => recipe.UserId == userId).ToListAsync();
        }

        public async Task<Recipe> RetrieveRecipeById(string userId, long id)
        {
            return await _context.Recipes.FirstOrDefaultAsync(recipe => recipe.Id == id && recipe.UserId == userId);
        }

        public async Task<bool> RemoveRecipeById(string userId, long id)
        {
            var recipe = await _context.Recipes.FirstOrDefaultAsync(item => item.Id == id);
            if (recipe == null)
            {
                return false;
            }

            if (recipe.UserId != userId)
            {
                throw new ForbiddenAccessException();
            }

            _context.Recipes.Remove(recipe);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}