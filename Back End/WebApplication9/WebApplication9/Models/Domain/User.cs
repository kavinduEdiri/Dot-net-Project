using System.ComponentModel.DataAnnotations;

namespace WebApplication9.Models.Domain
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public string Role { get; set; }  // <-- NEW
    }
}
