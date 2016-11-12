using System;
using System.Collections.Generic;

namespace PlanEatSave.Models
{
    public class PantryViewModel
    {
        public long Id { get; set; }
        public string UserId { get; set; }
        public List<PantryItemViewModel> PantryItems { get; set; }
    }


    public class PantryItemViewModel
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public DateTime Expiration { get; set; }
        public long PantryId { get; set; }
    }
}