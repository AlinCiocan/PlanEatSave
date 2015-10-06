using System.Collections.Generic;

namespace Entities.BoardEntities
{
    public class BoardEntity
    {
        public long Id { get; set; }
        public string Title { get; set; }
        public IList<DayEntity> Days { get; set; }
    }
}
