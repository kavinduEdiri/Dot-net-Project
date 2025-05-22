namespace WebApplication9.Models.Domain
{
    public class Category
    {
        public required int Id { get; set; }
        public string Name { get; set; }

       
        public ICollection<Post> Posts { get; set; }
    }
}
