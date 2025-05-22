using Microsoft.AspNetCore.Identity;

namespace WebApplication9.Repositories.Interface
{
    public interface IRepositoryToken
    {
        string CreateJWTToken(IdentityUser user, List<string> roles);
    }
}
