using System;
using System.Collections.Generic;

namespace FoodPlanApp.Models.BoardModels
{
    public class BoardDayModel
    {
        public DateTime Date { get; set; }
        public IList<CategoryModel> DaysCategories { get; set; }

    }
}