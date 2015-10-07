using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using DataAccessLayer;
using ViewModels.UserModels;

namespace FoodPlanApp.Controllers
{
    public class BoardController : Controller
    {
        //
        // GET: /Board/

        public ActionResult Index()
        {
            var user = Session["user"] as UserViewModel;
            if (user == null)
            {
                return RedirectToAction("Login", "User");
            }

            return View();
        }

    }
}
