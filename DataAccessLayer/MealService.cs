using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using PlanEatSave.Exceptions;
using PlanEatSave.Models.MealModels;

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

        public async Task<List<PlannedDay>> GetMeals(string userId, DateTime startDate, DateTime endDate)
        {
            var meals = await (
                            _context.Meals
                            .Where(meal => meal.UserId == userId && meal.MealDate >= startDate && meal.MealDate <= endDate)
                            .Join
                            (
                                _context.Recipes,
                                meal => meal.RecipeId,
                                recipe => recipe.Id,
                                (meal, recipe) => new MealWithRecipeName { Id = meal.Id, MealOrder = meal.MealOrder, MealDate = meal.MealDate, RecipeId = meal.RecipeId, RecipeName = recipe.Name })
                            )
                            .ToListAsync();

            return ConvertMealsToPlannedDays(startDate, endDate, meals);
        }

        private List<PlannedDay> ConvertMealsToPlannedDays(DateTime startDate, DateTime endDate, List<MealWithRecipeName> meals)
        {
            var allDates = Enumerable
                               .Range(0, endDate.Subtract(startDate).Days + 1)
                               .Select(dayDifference => startDate.AddDays(dayDifference));

            return allDates.Select(mealDate => new PlannedDay
            {
                MealDate = mealDate,
                Meals = meals
                            .Where(meal => meal.MealDate == mealDate)
                            .Select(meal => new MealViewModel(meal.Id, meal.RecipeId, meal.RecipeName, meal.MealOrder))
                            .ToList()
            }).ToList();
        }
    }
}