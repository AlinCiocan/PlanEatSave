using System.Collections.Generic;

namespace ViewModels.BoardModels
{
    public class CategoryViewModel
    {
        public long Id { get; set; }
        public string Title { get; set; }
        public IList<ItemViewModel> Items { get; set; }
        public long DayId { get; set; }
    }
}