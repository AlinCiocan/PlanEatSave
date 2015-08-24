using System;
using System.Collections.Generic;

namespace Entities.BoardEntities
{
    public class DayEntity
    {
        public long Id { get; set; }
        public DateTime Date { get; set; }
        public IList<CategoryEntity> Categories { get; set; }
        public long BoardId { get; set; }
        public BoardEntity Board { get; set; }
    }
}