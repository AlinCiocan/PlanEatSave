using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace PlanEatSave.Models.PantryModels
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

        [Required]
        public string Name { get; set; }

        [Required]
        public DateTime Expiration { get; set; }

        [Required]
        public long PantryId { get; set; }
    }
}