using System.ComponentModel.DataAnnotations;

namespace FoodPlan.Models 
{
    public class UserRegisterModel
    {
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [MinLengthAttribute(6)]
        public string Password { get; set; }
    }
}