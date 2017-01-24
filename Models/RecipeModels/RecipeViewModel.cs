using System.Collections.Generic;

namespace PlanEatSave.Models.RecipeModels
{
    public class RecipeViewModel
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public List<string> Ingredients { get; set; }
        public string Preparation { get; set; }
    }
}