using System.ComponentModel.DataAnnotations;

namespace PlanEatSave.Models 
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