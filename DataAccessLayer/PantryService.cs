using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace PlanEatSave.DataAceessLayer
{
    public class PantryService
    {
        private ApplicationDbContext _context;
        private ILogger<PantryService> _logger;

        public PantryService(ApplicationDbContext context, ILogger<PantryService> logger)
        {
            _context = context;
            _logger = logger;
        }


        public async Task<Pantry> GetPantryByUserIdAsync(string userId)
        {
            var pantryFromDb = await _context.Pantries
                                .Where(pantry => pantry.UserId == userId)
                                .Include(pantry => pantry.PantryItems).FirstOrDefaultAsync();

            if (pantryFromDb != null)
            {
                return pantryFromDb;
            }



            var newPantry = new Pantry
            {
                UserId = userId
            };

            _context.Pantries.Add(newPantry);
            await _context.SaveChangesAsync();
            return newPantry;
        }

        public async Task<bool> AddItem(string userId, PantryItem item)
        {
            var pantryDb = await _context.Pantries.Where(pantry => pantry.Id == item.PantryId).FirstOrDefaultAsync();
            if (pantryDb == null || pantryDb.UserId != userId)
            {
                return false;
            }

            _context.PantryItems.Add(item);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}