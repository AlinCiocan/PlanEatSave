using System.ComponentModel;

namespace Utils
{
    public enum ObjectState
    {
        [Description("unchanged")]
        Unchanged,

        [Description("added")]
        Added,

        [Description("edited")]
        Edited,

        [Description("deleted")]
        Deleted

    }
}
