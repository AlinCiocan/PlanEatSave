using System;
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

            if (await RecipeDoesNotExistInDatabase(recipe))
            {
                return false;
            }

            _context.Entry(recipe).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return true;

        }

        private async Task<bool> RecipeDoesNotExistInDatabase(Recipe recipe)
        {
            return await _context.Recipes.FirstOrDefaultAsync(r => r.Id == recipe.Id && r.UserId == recipe.UserId) == null;
        }
    }
}