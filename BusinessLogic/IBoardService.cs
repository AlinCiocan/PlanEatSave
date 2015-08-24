using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ViewModels.BoardModels;

namespace BusinessLogic
{
    public interface IBoardService
    {
        BoardViewModel GetBoardById(long boardId);
    }
}
