using System;
using System.Collections.Generic;

namespace FoodPlanApp.Models.BoardModels
{
    public class DayModel
    {
        public DateTime Date { get; set; }
        public IList<CategoryModel> Categories { get; set; }

    }
}