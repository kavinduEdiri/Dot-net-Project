using WebApplication9.Models.Domain;


namespace WebApplication9.Repositeries.Interface
{
    public interface IRepositoryCategory
    {

        Task<List<Category>> GetAllAsync(int pageNumber = 1, int pageSize = 100);
        Task<Category?> GetByIdAsync(int id);
        Task<Category> CreateAsync(Category category);
        Task<Category> UpdateAsync(int id, Category category);
        Task<Category?> DeleteAsync(int id);
    }
}
