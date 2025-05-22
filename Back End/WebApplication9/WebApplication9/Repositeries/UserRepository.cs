using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using WebApplication9.Database;
using WebApplication9.Models.Domain;
using WebApplication9.Models.DTO.User;
using WebApplication9.Repositeries.Interface;

namespace WebApplication9.Repositeries
{
    public class UserRepository : IUserRepository
    {
        private readonly ApplicationConnection _context;
        public UserRepository(ApplicationConnection context) => _context = context;

        public async Task<User?> GetByUsernameAsync(string username)
            => await _context.Users.FirstOrDefaultAsync(u => u.Username == username);

        public async Task AddUserAsync(User user)
        {
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
        }
    }
}
