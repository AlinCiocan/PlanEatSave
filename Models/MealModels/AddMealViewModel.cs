using System;
using System.ComponentModel.DataAnnotations;

namespace PlanEatSave.Models
{
    public class AddMealViewModel
    {
        [Required]
        public long RecipeId { get; set; }

        [Required]
        public DateTime MealDate { get; set; }

        [Required]
        public long MealOrder { get; set; }
    }
}