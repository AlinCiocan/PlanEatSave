using System.Linq;

namespace PlanEatSave.DataAceessLayer
{
    public class PantryService
    {
        private ApplicationDbContext _context;
        public PantryService(ApplicationDbContext context)
        {
            _context = context;
        }


        public Pantry GetPantryByUserId(string userId)
        {
            return _context.Pantries.Where(pantry => pantry.UserId == userId).First();
        }
    }
}