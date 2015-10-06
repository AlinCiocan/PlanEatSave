using AutoMapper;
using DataAccessLayer;
using ViewModels.UserModels;

namespace BusinessLogic
{
    public class UserService
    {
        private IUserDao _userDao;

        public UserService(IUserDao userDao)
        {
            _userDao = userDao;
        }

        public UserLoginResponse Login(UserLoginViewModel user)
        {
            var userFromDatabase = _userDao.GetUserByUsername(user.Username);
            if (userFromDatabase != null && userFromDatabase.Password == user.Password)
            {
                return new UserLoginResponse {IsLoggedIn = true, User = Mapper.Map<UserViewModel>(userFromDatabase)};
            }

            return new UserLoginResponse {IsLoggedIn = false, Message = "Username or password is incorrect"};
        }
    }
}
