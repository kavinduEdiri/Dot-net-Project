using Microsoft.AspNetCore.Identity;
using WebApplication9.Models.Domain;
using WebApplication9.Models.DTO.User;

namespace WebApplication9.Repositeries.Interface
{
    public interface IUserRepository
    {
        Task<User?> GetByUsernameAsync(string username);
        Task AddUserAsync(User user);
    }
}
