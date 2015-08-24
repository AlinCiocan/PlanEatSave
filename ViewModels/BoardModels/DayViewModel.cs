using System;
using System.Collections.Generic;

namespace ViewModels.BoardModels
{
    public class DayViewModel
    {
        public long Id { get; set; }
        public DateTime Date { get; set; }
        public IList<CategoryViewModel> Categories { get; set; }
        public long BoardId { get; set; }

    }
}