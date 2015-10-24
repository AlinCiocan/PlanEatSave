using System.Data.Entity;
using System.Data.Entity.Core.Objects.DataClasses;
using System.Linq;
using Entities.BoardEntities;
using Repository;
using Utils;

namespace DataAccessLayer
{
    public class BoardDao : IBoardDao
    {
        public BoardEntity GetBoardById(long boardId)
        {
            using (var repository = new FoodPlanAppContext())
            {
                var boardEntity = IncludeAllBoardProperties(repository.BoardEntities).
                    FirstOrDefault(board => board.Id == boardId);

                return boardEntity;
            }
        }

        public BoardEntity UpdateBoard(BoardEntity updatedBoard)
        {
            using (var repository = new FoodPlanAppContext())
            {
                UpdateAllBoardProperties(updatedBoard, repository);
                repository.SaveChanges();
            }

            return updatedBoard;
        }

        public void ClearBoard(long boardId)
        {
            using (var repository = new FoodPlanAppContext())
            {
                var currentBoard = IncludeAllBoardProperties(repository.BoardEntities).FirstOrDefault(board => board.Id == boardId);
                if (currentBoard != null)
                {

                    foreach (var day in currentBoard.Days.ToList())
                    {
                        repository.DayEntities.Remove(day);
                    }
                }
                repository.SaveChanges();
            }
        }

        private IQueryable<BoardEntity> IncludeDays(IQueryable<BoardEntity> query)
        {
            return query.Include(board => board.Days);
        }


        private IQueryable<BoardEntity> IncludeCategories(IQueryable<BoardEntity> query)
        {
            return query.Include(board => board.Days.Select(day => day.Categories));
        }

        private IQueryable<BoardEntity> IncludeItems(IQueryable<BoardEntity> query)
        {
            return query.Include(board => board.Days.Select(day => day.Categories.Select(category => category.Items)));
        }

        private IQueryable<BoardEntity> IncludeAllBoardProperties(IQueryable<BoardEntity> query)
        {
            // TODO: refactor this with extension methods
            return IncludeItems(IncludeCategories(IncludeDays(query)));
        }


        private static void UpdateAllBoardProperties(BoardEntity updatedBoard, FoodPlanAppContext repository)
        {
            //TODO: Refactor this method in a nicer way

            repository.BoardEntities.Add(updatedBoard);
            repository.Entry(updatedBoard).State = EntityState.Modified;

            foreach (var day in updatedBoard.Days)
            {

                if (day.Id == 0)
                {
                    repository.DayEntities.Add(day);
                }
                else
                {
                    repository.DayEntities.Attach(day);
                    repository.Entry(day).State = EntityState.Modified;
                }

                var deletedCategories = day.Categories.Where(category=> category.State == ObjectState.Deleted).ToList();

                foreach (var deletedCategory in deletedCategories)
                {
                    //deletedCategory.Items.ToList().ForEach(item => repository.Entry(item).State = EntityState.Deleted);


                    var deletedItems = deletedCategory.Items.ToList();

                    foreach (var deletedItem in deletedItems)
                    {
                        repository.Entry(deletedItem).State = EntityState.Deleted;
                    }


                    repository.Entry(deletedCategory).State = EntityState.Deleted;
                }



                foreach (var category in day.Categories)
                {

                    if (category.Id == 0)
                    {
                        repository.CategoryEntities.Add(category);
                    }
                    else
                    {
                        repository.Entry(category).State = EntityState.Modified;
                    }

                   
                    category.Items.Where(item => item.State == ObjectState.Deleted)
                                  .ToList()
                                  .ForEach(item => repository.Entry(item).State = EntityState.Deleted);


                    foreach (var item in category.Items)
                    {



                    if (item.Id == 0)
                        {
                            repository.ItemEntities.Add(item);
                        }
                        else
                        {
                            repository.ItemEntities.Attach(item);
                            repository.Entry(item).State = EntityState.Modified;
                        }
                    }
                }
            }
        }
    }
}