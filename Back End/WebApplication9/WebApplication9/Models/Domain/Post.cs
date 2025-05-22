using System.ComponentModel.DataAnnotations.Schema;

namespace WebApplication9.Models.Domain
{
    public class Post
    {
        public required int Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }

        [ForeignKey("Category")]
        public int CategoryId { get; set; }

        public Category Categories { get; set; }
    }
}
