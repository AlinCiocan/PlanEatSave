using Entities.BoardEntities;

namespace DataAccessLayer
{
    public interface IBoardDao
    {
        BoardEntity GetBoardById(long boardId);
        BoardEntity UpdateBoard(BoardEntity updatedBoard);
    }
}
