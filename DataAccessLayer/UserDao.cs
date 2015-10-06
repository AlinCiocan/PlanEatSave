using System.Linq;
using Entities.UserEntities;
using Repository;

namespace DataAccessLayer
{
    public class UserDao : IUserDao
    {
        public UserEntity GetUserByUsername(string username)
        {
            using (var repository = new FoodPlanAppContext())
            {
                return repository.UserEntities.FirstOrDefault(user => user.Username == username);
            }
        }
    }
}