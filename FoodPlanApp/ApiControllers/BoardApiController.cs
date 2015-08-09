using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using FoodPlanApp.Models.BoardModels;

namespace FoodPlanApp.ApiControllers
{
    public class BoardApiController : ApiController
    {
        // GET api/boardapi
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/boardapi/5
        public string Get(int id)
        {

            //var board = new BoardModel {BoardDays = GenereateBoardDays()}
            return "value";
        }

        // POST api/boardapi
        public void Post([FromBody]string value)
        {
        }

        // PUT api/boardapi/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/boardapi/5
        public void Delete(int id)
        {
        }
    }
}
