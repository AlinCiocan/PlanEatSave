using System;
using System.Collections.Generic;
using System.Net;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using BusinessLogic;
using DataAccessLayer;
using FoodPlanApp.Authentication;
using FoodPlanApp.Authentication.UserSessionStore;
using ViewModels.BoardModels;

namespace FoodPlanApp.ApiControllers
{
    public class BoardController : ApiController
    {
        public BoardService BoardService { get; set; }
        public IUserAuthentication UserAuthentication { get; set; }


        public BoardController()
        {
            BoardService = new BoardService(new BoardDao());
            UserAuthentication = new UserAuthentication(new UserSessionStore(HttpContext.Current.Session));
        }

        // GET api/board
        public IEnumerable<string> Get()
        {
            return new[] {"value1", "value2"};
        }

        // GET api/board/5
        public BoardViewModel Get(long id)
        {
            if (UserAuthentication.IsUserLoggedIn())
            {
                return BoardService.GetBoardById(id);
            }
            throw new HttpResponseException(HttpStatusCode.Forbidden);
        }

        // POST api/board
        public void Post([FromBody] BoardViewModel boardView)
        {
            //store the board
        }

        // PUT api/board/5
        public BoardViewModel Put(int id, [FromBody] BoardViewModel boardView)
        {
            if (UserAuthentication.IsUserLoggedIn())
            {
                return BoardService.UpdateBoard(boardView);
            }
            throw new HttpResponseException(HttpStatusCode.Forbidden);

        }

        // DELETE api/board/5
        [System.Web.Http.HttpDelete]
        public void Delete(long id)
        {
            if (UserAuthentication.IsUserLoggedIn())
            {
                BoardService.ClearBoard(id);
            }
            else
            {
                throw new HttpResponseException(HttpStatusCode.Forbidden);
            }
        }

    }
}
