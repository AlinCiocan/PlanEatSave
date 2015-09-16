using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using BusinessLogic;
using DataAccessLayer;
using ViewModels.BoardModels;

namespace FoodPlanApp.ApiControllers
{
    public class BoardController : ApiController
    {
        public BoardService BoardService { get; set; }

        public BoardController()
        {
            BoardService = new BoardService(new BoardDao());
        }

        // GET api/board
        public IEnumerable<string> Get()
        {
            return new string[] {"value1", "value2"};
        }

        // GET api/board/5
        public BoardViewModel Get(long id)
        {
            return BoardService.GetBoardById(id);
        }

        // POST api/board
        public void Post([FromBody] BoardViewModel boardView)
        {
            //store the board
        }

        // PUT api/board/5
        public BoardViewModel Put(int id, [FromBody] BoardViewModel boardView)
        {
            Console.WriteLine("Board Put here");
            return BoardService.UpdateBoard(boardView);
        }

        // DELETE api/board/5
        [HttpDelete]
        public void Delete(long id)
        {
            BoardService.ClearBoard(id);
        }

    }
}
