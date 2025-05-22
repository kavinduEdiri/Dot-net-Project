public class LoginDto
{
    public string Username { get; set; }
    public string Password { get; set; }

    // Add optional role during registration
    public string Role { get; set; } = "User";
}