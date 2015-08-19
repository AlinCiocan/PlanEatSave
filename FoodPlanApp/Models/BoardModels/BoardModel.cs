using System.Collections.Generic;

namespace FoodPlanApp.Models.BoardModels
{
    public class BoardModel
    {
        public long Id { get; set; }
        public IList<DayModel> Days { get; set; }
    }
}