using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using PlanEatSave.Constants;

namespace PlanEatSave.Models.RecipeModels
{
    public class RecipeViewModel
    {
        public long Id { get; set; }

        [MaxLength(RecipeConstants.NameMaxLength)]
        public string Name { get; set; }

        [MaxLength(RecipeConstants.IngredientsMaxLength)]
        public List<string> Ingredients { get; set; }

        [MaxLength(RecipeConstants.PreparationMaxLength)]
        public string Preparation { get; set; }
    }
}