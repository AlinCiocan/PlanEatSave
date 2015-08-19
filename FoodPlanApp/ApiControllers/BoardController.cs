using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using FoodPlanApp.Models.BoardModels;

namespace FoodPlanApp.ApiControllers
{
    public class BoardController : ApiController
    {
        // GET api/board
        public IEnumerable<string> Get()
        {
            return new string[] {"value1", "value2"};
        }

        // GET api/board/5
        public BoardModel Get(int id)
        {

            var board = new BoardModel {Days = GenereateBoardDaysForMockup(), Id = 1234};

            return board;
        }

        // POST api/board
        public void Post([FromBody] BoardModel board)
        {
            //store the board
        }

        // PUT api/board/5
        public void Put(int id, [FromBody] BoardModel board)
        {
            Console.WriteLine("Entered here");
        }

        // DELETE api/board/5
        public void Delete(int id)
        {
        }



        // method for mock up
        private static IList<DayModel> GenereateBoardDaysForMockup()
        {
            var days = new List<DayModel>
            {
                new DayModel
                {
                    Date = DateTime.Now,
                    Categories = new List<CategoryModel>
                    {
                        new CategoryModel
                        {
                            Title = "Breakfast",
                            Items = new List<ItemModel>
                            {
                                new ItemModel {Title = "breakfast food 1"},
                                new ItemModel {Title = "breakfast 2"}
                            }
                        },
                        new CategoryModel
                        {
                            Title = "Dinner",
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
