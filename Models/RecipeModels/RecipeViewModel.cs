using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using PlanEatSave.Constants;

namespace PlanEatSave.Models.RecipeModels
{
    public class RecipeViewModel
    {
        public long Id { get; set; }

        [Required]
        [MaxLength(RecipeConstants.NAME_MAX_LENGTH)]
        public string Name { get; set; }

        [MaxLength(RecipeConstants.INGREDIENTS_MAX_LENGTH)]
        public List<string> Ingredients { get; set; }

        [MaxLength(RecipeConstants.PREPARATION_MAX_LENGTH)]
        public string Preparation { get; set; }
    }
}