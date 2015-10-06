using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using BusinessLogic;
using DataAccessLayer;
using ViewModels.UserModels;

namespace FoodPlanApp.ApiControllers
{
    public class UserController : ApiController
    {

        public UserService UserService { get; set; }

        public UserController()
        {
            UserService = new UserService(new UserDao());
        }

        public UserLoginResponse Login(UserLoginViewModel user)
        {
            return UserService.Login(user);
        }

    }
}