using WebApplication9.Models.Domain;

namespace WebApplication9.Repositeries.Interface
{
    public interface IRepositoryPost
    {
        Task<(List<Post>, int)> GetAllAsync(int pageNumber = 1, int pageSize = 3);
        Task<Post?> GetByIdAsync(int id);
        Task<Post> CreateAsync(Post post);
        Task<Post> UpdateAsync(int id, Post post);
        Task<Post?> DeleteAsync(int id);
    }
}
