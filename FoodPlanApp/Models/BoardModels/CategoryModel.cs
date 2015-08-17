using System.Collections.Generic;

namespace FoodPlanApp.Models.BoardModels
{
    public class CategoryModel
    {
        public string CategoryName { get; set; }
        public IList<ItemModel> Items { get; set; }
    }
}