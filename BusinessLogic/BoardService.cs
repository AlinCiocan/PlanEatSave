using AutoMapper;
using DataAccessLayer;
using Entities.BoardEntities;
using ViewModels.BoardModels;

namespace BusinessLogic
{
    public class BoardService : IBoardService
    {
        private readonly IBoardDao _boardDao;

        public BoardService(IBoardDao boardDao)
        {
            _boardDao = boardDao;
        }

        public BoardViewModel GetBoardById(long boardId)
        {
            var boardEntity = _boardDao.GetBoardById(boardId);
            return Mapper.Map<BoardViewModel>(boardEntity);
        }

        public BoardViewModel UpdateBoard(BoardViewModel boardView)
        {
            var boardEntity = Mapper.Map<BoardEntity>(boardView);
            return Mapper.Map<BoardViewModel>(_boardDao.UpdateBoard(boardEntity));
        }

        public void ClearBoard(long boardId)
        {
            _boardDao.ClearBoard(boardId);
        }
    }
}
