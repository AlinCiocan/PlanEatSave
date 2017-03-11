using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using PlanEatSave.Exceptions;

namespace PlanEatSave.DataAceessLayer
{
    public class MealService
    {
        private ApplicationDbContext _context;
        private ILogger<MealService> _logger;

        public MealService(ApplicationDbContext context, ILogger<MealService> logger)
        {
            _context = context;
            _logger = logger;
        }
        
        public async Task AddMealFromExistingRecipe(string userId, Meal meal)
        {
            meal.UserId = userId;
            meal.Id = Guid.NewGuid().ToString();
            
            _context.Meals.Add(meal);
            await _context.SaveChangesAsync();
        }
    }
}