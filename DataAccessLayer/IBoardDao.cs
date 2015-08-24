using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Entities.BoardEntities;

namespace DataAccessLayer
{
    public interface IBoardDao
    {
        BoardEntity GetBoardById(long boardId);
        void UpdateBoard(BoardEntity updatedBoard);
    }
}
