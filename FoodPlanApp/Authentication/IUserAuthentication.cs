using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ViewModels.UserModels;

namespace FoodPlanApp.Authentication
{
    public interface IUserAuthentication
    {
        void LoginUser(UserViewModel user);
        bool IsUserLoggedIn();
        UserViewModel GetUser();
    }
}
