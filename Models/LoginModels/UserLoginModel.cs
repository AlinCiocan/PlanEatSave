using System.ComponentModel.DataAnnotations;

namespace PlanEatSave.Models
{
    public class UserLoginModel
    {
        [Required]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
    }

}