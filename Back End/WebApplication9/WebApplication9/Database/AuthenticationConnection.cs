using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace WebApplication9.Database
{
    public class AuthenticationConnection : IdentityDbContext
    {
        public AuthenticationConnection(DbContextOptions<AuthenticationConnection> dbContextOptions) : base(dbContextOptions)
        {

        }

        //To seeed roles 
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            var adminRoleId = "d3d73a0a-1a72-4797-9ac9-43cf4fda5424";
            var userRoleId = "e95efa10-513c-454a-807f-191dcbb147b1";

            var roles = new List<IdentityRole>
            {
                new IdentityRole
                {
                    Id = adminRoleId,
                    ConcurrencyStamp = adminRoleId,
                    Name = "Admin",
                    NormalizedName = "Admin".ToUpper()
                },
                new IdentityRole
                {
                    Id = userRoleId,
                    ConcurrencyStamp = userRoleId,
                    Name = "User",
                    NormalizedName = "User".ToUpper()
                }
            };

            modelBuilder.Entity<IdentityRole>().HasData(roles);
        }
    }
}
