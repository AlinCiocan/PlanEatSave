using Utils;

namespace ViewModels.BoardModels
{
    public class ItemViewModel
    {
        public long Id { get; set; }
        public string Title { get; set; }
        public long CategoryId { get; set; }
        public ObjectState State { get; set; }
    }
}