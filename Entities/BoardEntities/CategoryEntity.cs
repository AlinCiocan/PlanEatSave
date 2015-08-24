using System.Collections.Generic;

namespace Entities.BoardEntities
{
    public class CategoryEntity
    {
        public long Id { get; set; }
        public string Title { get; set; }
        public IList<ItemEntity> Items { get; set; }
        public long DayId { get; set; }
        public DayEntity Day { get; set; }
    }
}