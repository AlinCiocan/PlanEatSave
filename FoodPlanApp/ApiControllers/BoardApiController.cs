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
            return new string[] {"value1", "value2"};
        }

        // GET api/boardapi/5
        public BoardModel Get(int id)
        {

            var board = new BoardModel {BoardDays = GenereateBoardDaysForMockup()};

            return board;
        }

        // POST api/boardapi
        public void Post([FromBody] BoardModel board)
        {
            //store the board
        }

        // PUT api/boardapi/5
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/boardapi/5
        public void Delete(int id)
        {
        }



        // method for mock up
        private static IList<BoardDayModel> GenereateBoardDaysForMockup()
        {
            var days = new List<BoardDayModel>
            {
                new BoardDayModel
                {
                    Date = DateTime.Now,
                    DaysCategories = new List<CategoryModel>
                    {
                        new CategoryModel
                        {
                            CategoryName = "Breakfast",
                            Items = new List<ItemModel>
                            {
                                new ItemModel {Title = "breakfast food 1"},
                                new ItemModel {Title = "breakfast 2"}
                            }
                        },
                        new CategoryModel
                        {
                            CategoryName = "Dinner",
                            Items = new List<ItemModel>
                            {
                                new ItemModel {Title = "dinner 1 food"},
                                new ItemModel {Title = "dinner 2 food"}
                            }
                        }
                    }
                }
            };


            return days;
        }
    }
}
