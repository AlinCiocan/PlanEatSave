using System.Collections.Generic;
using Utils;

namespace ViewModels.BoardModels
{
    public class CategoryViewModel
    {
        public long Id { get; set; }
        public string Title { get; set; }
        public IList<ItemViewModel> Items { get; set; }
        public long DayId { get; set; }
        public ObjectState State { get; set; }
    }
}