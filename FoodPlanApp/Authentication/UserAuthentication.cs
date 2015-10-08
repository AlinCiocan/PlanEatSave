using FoodPlanApp.Authentication.UserSessionStore;
using ViewModels.UserModels;

namespace FoodPlanApp.Authentication
{
    public class UserAuthentication : IUserAuthentication
    {
        private readonly IUserSessionStore _userSessionStore;

        public UserAuthentication(IUserSessionStore userSessionStore)
        {
            _userSessionStore = userSessionStore;
        }

        public void LoginUser(UserViewModel user)
        {
            _userSessionStore.StoreUser(user);
        }

        public bool IsUserLoggedIn()
        {
            return _userSessionStore.RetrieveUser() != null;
        }

        public UserViewModel GetUser()
        {
            return _userSessionStore.RetrieveUser();
        }
    }
}