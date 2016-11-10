using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace PlanEatSave.DataAceessLayer
{
    public class PantryService
    {
        private ApplicationDbContext _context;
        public PantryService(ApplicationDbContext context)
        {
            _context = context;
        }


        public async Task<Pantry> GetPantryByUserIdAsync(string userId)
        {
            return await _context.Pantries
                                .Where(pantry => pantry.UserId == userId)
                                .Include(pantry => pantry.PantryItems).FirstOrDefaultAsync();
        }
    }
}