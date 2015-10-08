using System.Web.SessionState;
using ViewModels.UserModels;
using static FoodPlanApp.Authentication.UserAuthenticationConstants;

namespace FoodPlanApp.Authentication.UserSessionStore
{
    public class UserSessionStore : IUserSessionStore
    {
        private readonly HttpSessionState _session;

        public UserSessionStore(HttpSessionState session)
        {
            _session = session;
        }

        public void StoreUser(UserViewModel user)
        {
            _session[UserKey] = user;
        }

        public UserViewModel RetrieveUser()
        {
            return _session[UserKey] as UserViewModel;
        }
    }
}