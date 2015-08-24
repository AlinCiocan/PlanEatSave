using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Entities.BoardEntities;

namespace Repository.Seed
{
    public class BoardGenerator
    {
        public static BoardEntity GenerateDefaultBoard()
        {
            return new BoardEntity { Id = 1, Title = "MyBoard1", Days = GenereateBoardDaysForMockup() };
        }

        private static IList<DayEntity> GenereateBoardDaysForMockup()
        {
            var days = new List<DayEntity>
            {
                new DayEntity
                {
                    Date = DateTime.Now,
                    Categories = new List<CategoryEntity>
                    {
                        new CategoryEntity
                        {
                            Title = "Breakfast",
                            Items = new List<ItemEntity>
                            {
                                new ItemEntity {Title = "breakfast food 1"},
                                new ItemEntity {Title = "breakfast 2"}
                            }
                        },
                        new CategoryEntity
                        {
                            Title = "Dinner",
                            Items = new List<ItemEntity>
                            {
                                new ItemEntity {Title = "dinner 1 food"},
                                new ItemEntity {Title = "dinner 2 food"}
                            }
                        }
                    }
                }
            };


            return days;
        }
    }
}
