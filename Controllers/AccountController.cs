using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using FoodPlan.DataAceessLayer;
using FoodPlan.Models;

namespace FoodPlan.Controllers
{
    public class AccountController : Controller
    {
        private ApplicationDbContext _context;
        public AccountController(ApplicationDbContext context)
        {
            _context = context;
        }
        [HttpPost]
        public IActionResult Register(UserRegisterModel user)
        {
            return Ok(user);
        }
    }
}