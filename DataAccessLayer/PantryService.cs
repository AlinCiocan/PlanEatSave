using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using PlanEatSave.Exceptions;

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

        public async Task<bool> InsertOrUpdate(string userId, PantryItem item)
        {
            var pantryDb = await _context.Pantries.Where(pantry => pantry.Id == item.PantryId).FirstOrDefaultAsync();
            if (pantryDb == null || pantryDb.UserId != userId)
            {
                return false;
            }

            _context.Entry(item).State = item.Id > 0 ? 
                                   EntityState.Modified :
                                   EntityState.Added; 

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<PantryItem> GetItemById(string userId, long id)
        {
            var pantryItem = await _context.PantryItems.FirstOrDefaultAsync(item => item.Id == id);
            if(pantryItem == null)
            {
                return null;
            }
            
            var pantry = await _context.Pantries.FirstOrDefaultAsync(p => p.Id == pantryItem.PantryId);

            if(pantry.UserId != userId) 
            {
                throw new ForbiddenAccessException();
            }

            return pantryItem;
        }

        internal async Task<bool> RemoveItemById(string userId, long id)
        {
           var pantryItem = await _context.PantryItems.FirstOrDefaultAsync(item => item.Id == id);
            if(pantryItem == null)
            {
                return false;
            }
            
            var pantry = await _context.Pantries.FirstOrDefaultAsync(p => p.Id == pantryItem.PantryId);

            if(pantry.UserId != userId) 
            {
                throw new ForbiddenAccessException();
            }

            _context.PantryItems.Remove(pantryItem);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}