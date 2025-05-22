using Microsoft.EntityFrameworkCore;
using WebApplication9.Models.Domain;
namespace WebApplication9.Database
{
    public class ApplicationConnection : DbContext
    {
        public ApplicationConnection(DbContextOptions<ApplicationConnection> dbContextOptions) : base(dbContextOptions)
        {

        }

        public DbSet<Post> Posts { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<User> Users { get; set; }
    }

}
