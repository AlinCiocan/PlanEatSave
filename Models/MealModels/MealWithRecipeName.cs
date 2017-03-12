using System;

namespace PlanEatSave.Models.MealModels
{
    public class MealWithRecipeName
    {
        public string Id { get; set; }
        public long RecipeId { get; set; }
        public string RecipeName { get; set; }
        public long MealOrder { get; set; }
        public DateTime MealDate { get; set; }
    }
}