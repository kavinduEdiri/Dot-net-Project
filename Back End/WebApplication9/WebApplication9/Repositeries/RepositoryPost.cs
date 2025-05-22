using Microsoft.EntityFrameworkCore;
using WebApplication9.Database;
using WebApplication9.Models.Domain;
using WebApplication9.Repositeries.Interface;



namespace WebApplication9.Repositeries
{
    public class RepositoryPost : IRepositoryPost
    {
        private readonly ApplicationConnection _connection;

        public RepositoryPost(ApplicationConnection connection)
        {
            _connection = connection;
        }

        public async Task<Post> CreateAsync(Post post)
        {
            await _connection.Posts.AddAsync(post);
            await _connection.SaveChangesAsync();
            return post;
        }

        public async Task<Post?> DeleteAsync(int id)
        {
            var existingPost = await _connection.Posts.FirstOrDefaultAsync(x => x.Id == id);
            if (existingPost == null)
            {
                return null;
            }
            _connection.Posts.Remove(existingPost);
            await _connection.SaveChangesAsync();
            return existingPost;
        }

        public async Task<(List<Post>, int)> GetAllAsync(int pageNumber = 1, int pageSize = 3)
        {
            var skipResult = (pageNumber - 1) * pageSize;

            var result = await _connection.Posts.Skip(skipResult).Take(pageSize).ToListAsync();
            var totalPosts = await _connection.Posts.CountAsync();
            return (result, totalPosts);
        }

        public async Task<Post> GetByIdAsync(int id)
        {
            var result = await _connection.Posts.FirstOrDefaultAsync(x => x.Id == id);
            return result;
        }

        public async Task<Post> UpdateAsync(int id, Post post)
        {
            var existingPost = await _connection.Posts.FirstOrDefaultAsync(x => x.Id == id);
            if (existingPost == null)
            {
                return null;
            }

            existingPost.Title = post.Title;
            existingPost.Content = post.Content;
            existingPost.CategoryId = post.CategoryId;

            await _connection.SaveChangesAsync();
            return existingPost;
        }
    }
}
