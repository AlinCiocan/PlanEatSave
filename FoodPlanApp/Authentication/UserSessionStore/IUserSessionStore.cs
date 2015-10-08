using ViewModels.UserModels;

namespace FoodPlanApp.Authentication.UserSessionStore
{
    public interface IUserSessionStore
    {
        void StoreUser(UserViewModel user);
        UserViewModel RetrieveUser();
    }
}
