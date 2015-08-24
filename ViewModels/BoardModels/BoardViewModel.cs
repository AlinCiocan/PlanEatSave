using System.Collections.Generic;

namespace ViewModels.BoardModels
{
    public class BoardViewModel
    {
        public long Id { get; set; }
        public string Title { get; set; }
        public IList<DayViewModel> Days { get; set; }
    }
}