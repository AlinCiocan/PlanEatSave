using Entities.UserEntities;

namespace DataAccessLayer
{
    public interface IUserDao
    {
        UserEntity GetUserByUsername(string username);
    }
}
