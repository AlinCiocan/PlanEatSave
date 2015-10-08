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
using FoodPlanApp.Authentication;
using FoodPlanApp.Authentication.UserSessionStore;
using ViewModels.UserModels;

namespace FoodPlanApp.ApiControllers
{
    public class UserController : ApiController
    {

        public UserService UserService { get; set; }
        public IUserAuthentication UserAuthentication { get; set; }


        public UserController()
        {
            UserService = new UserService(new UserDao());
            UserAuthentication = new UserAuthentication(new UserSessionStore(HttpContext.Current.Session));
        }

        public UserViewModel Login(UserLoginViewModel user)
        {
            // TODO: refactor this, because the wrapper for userLoginResponse is not need it anymore, since if password is incorect then will return an Forbidden response
            var userLoginResponse = UserService.Login(user);
            if (userLoginResponse.IsLoggedIn)
            {
                return userLoginResponse.User;
            }

            throw new HttpResponseException(HttpStatusCode.Forbidden);
        }

    }
}