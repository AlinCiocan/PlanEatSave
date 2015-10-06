namespace ViewModels.UserModels
{
    public class UserLoginResponse
    {
        public bool IsLoggedIn { get; set; }
        public string Message { get; set; }
        public UserViewModel User { get; set; }
    }
}
