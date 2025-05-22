using System.ComponentModel.DataAnnotations;

namespace WebApplication9.Models.DTO.User
{
    public class AddUserDTO
    {
        [Required]
        [DataType(DataType.Text)]
        public string Username { get; set; }
        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; }
        public string[] Roles { get; set; }
    }
}
