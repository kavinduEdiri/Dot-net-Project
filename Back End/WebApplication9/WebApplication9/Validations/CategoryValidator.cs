using FluentValidation;
using WebApplication9.Database;
using WebApplication9.Models.DTO.Category;
using WebApplication9.Database;
using WebApplication9.Models.DTO.Category;
namespace WebApplication9.Validations
{
    public class CategoryValidator : AbstractValidator<AddCategoryDTO>
    {
        private readonly ApplicationConnection _connection;

        public CategoryValidator(ApplicationConnection connection)
        {
            _connection = connection;

            RuleFor(category => category.Name)
                .NotEmpty().WithMessage("Category Name must be required")
                .Must(BeAlphaOnly).WithMessage("Category Name cannot contain numbers")
                .Must(BeUniquName).WithMessage("Category Name must be unique");

        }

        private bool BeAlphaOnly(string value)
        {
            return !string.IsNullOrEmpty(value) && !value.Any(char.IsDigit);
        }

        private bool BeUniquName(string name)
        {
            return !_connection.Categories.Any(c => c.Name == name);
        }
    }
}
