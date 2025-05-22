using Microsoft.EntityFrameworkCore;
using WebApplication9.Database;
using WebApplication9.Models.Domain;
using WebApplication9.Repositeries.Interface;

namespace WebApplication9.Repositeries
{
    public class RepositoryCategory : IRepositoryCategory
    {
        private readonly ApplicationConnection _connection;

        public RepositoryCategory(ApplicationConnection connection)
        {
            _connection = connection;
        }

        public async Task<Category> CreateAsync(Category category)
        {
            await _connection.Categories.AddAsync(category);
            await _connection.SaveChangesAsync();
            return category;
        }

        public async Task<Category?> DeleteAsync(int id)
        {
            var existingCategory = await _connection.Categories.FirstOrDefaultAsync(x => x.Id == id);
            if (existingCategory == null)
            {
                return null;
            }
            _connection.Categories.Remove(existingCategory);
            await _connection.SaveChangesAsync();
            return existingCategory;
        }

        public async Task<List<Category>> GetAllAsync(int pageNumber = 1, int pageSize = 100)
        {
            var skipResult = (pageNumber - 1) * pageSize;

            var result = await _connection.Categories.Skip(skipResult).Take(pageSize).ToListAsync();
            return result;
        }

        public async Task<Category> GetByIdAsync(int id)
        {
            var result = await _connection.Categories.FirstOrDefaultAsync(x => x.Id == id);
            return result;
        }

        public async Task<Category> UpdateAsync(int id, Category category)
        {
            var existingCategory = await _connection.Categories.FirstOrDefaultAsync(x => x.Id == id);
            if (existingCategory == null)
            {
                return null;
            }

            existingCategory.Name = category.Name;

            await _connection.SaveChangesAsync();
            return existingCategory;
        }
    }
}
