namespace Entities.BoardEntities
{
    public class ItemEntity
    {
        public long Id { get; set; }
        public string Title { get; set; }
        public long CategoryId { get; set; }
        public CategoryEntity Category { get; set; }
    }
}