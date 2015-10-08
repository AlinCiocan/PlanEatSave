using System.Web.Mvc;
using FoodPlanApp.Authentication;
using FoodPlanApp.Authentication.UserSessionStore;

namespace FoodPlanApp.Controllers
{
    public class BoardController : Controller
    {

        public IUserAuthentication UserAuthentication { get; set; }

        public BoardController()
        {
            UserAuthentication = new UserAuthentication(new UserSessionStore(System.Web.HttpContext.Current.Session));
        }

        //
        // GET: /Board/

        public ActionResult Index()
        {
            if (UserAuthentication.IsUserLoggedIn())
            {
                return View();
            }

            return RedirectToAction("Login", "User");
        }

    }
}
