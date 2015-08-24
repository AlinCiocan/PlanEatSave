using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
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

        public void UpdateBoard(BoardViewModel boardView)
        {
            var boardEntity = Mapper.Map<BoardEntity>(boardView);
            _boardDao.UpdateBoard(boardEntity);
        }
    }
}
