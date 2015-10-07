using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.ModelBinding;
using System.Web.SessionState;
using BusinessLogic;
using DataAccessLayer;
using ViewModels.UserModels;

namespace FoodPlanApp.ApiControllers
{
    public class UserController : ApiController
    {

        public UserService UserService { get; set; }
        private HttpSessionState Session { get; set; }

        public UserController()
        {
            UserService = new UserService(new UserDao());
            Session = HttpContext.Current.Session;
        }

        public UserLoginResponse Login(UserLoginViewModel user)
        {
            var userLoginResponse = UserService.Login(user);

            if (userLoginResponse.IsLoggedIn)
            {
                Session["user"] = userLoginResponse.User;
            }

            return userLoginResponse;
        }

    }
}