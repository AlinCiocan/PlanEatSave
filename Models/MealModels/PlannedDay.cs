using System;
using System.Collections.Generic;

namespace PlanEatSave.Models.MealModels
{
    public class PlannedDay
    {
        public DateTime MealDate { get; set; }
        public List<MealViewModel> Meals { get; set; }
    }

    public class MealViewModel
    {
        public MealViewModel()
        {

        }

        public MealViewModel(string id, long recipeId, string recipeName, long mealOrder)
        {
            Id = id;
            RecipeId = recipeId;
            RecipeName = RecipeName;
            MealOrder = mealOrder;
        }


        public string Id { get; set; }
        public long RecipeId { get; set; }
        public string RecipeName { get; set; }
        public long MealOrder { get; set; }
    }
}