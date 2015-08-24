using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.BoardEntities
{
    public class BoardEntity
    {
        public long Id { get; set; }
        public string Title { get; set; }
        public IList<DayEntity> Days { get; set; }
    }
}
