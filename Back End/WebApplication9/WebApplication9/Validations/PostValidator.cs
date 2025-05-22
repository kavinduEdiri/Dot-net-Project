using FluentValidation;
using WebApplication9.Database;
using WebApplication9.Models.DTO.Category;
using WebApplication9.Database;
using WebApplication9.Models.DTO.Post;

namespace WebApplication9.Validations
{
    public class PostValidator : AbstractValidator<AddPostDTO>
    {
        private readonly ApplicationConnection _connection;

        public PostValidator(ApplicationConnection connection)
        {
            _connection = connection;

            RuleFor(post => post.Title)
                .NotEmpty().WithMessage("Post title must be required")
                .Must(BeUniqueTitle).WithMessage("Post title must be unique");
            RuleFor(post => post.Content)
                .NotEmpty().WithMessage("Post content must be required");
            RuleFor(post => post.CategoryId)
                .NotEmpty().WithMessage("CategoryId must be required");

        }

        private bool BeUniqueTitle(string title)
        {
            return !_connection.Posts.Any(post => post.Title == title);
        }
    }
}
