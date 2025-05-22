using AutoMapper;
using FluentValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApplication9.Models.Domain;
using WebApplication9.Models.DTO.Category;
using WebApplication9.Repositeries.Interface;


using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebApplication9.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly IRepositoryCategory _repository;
        private readonly IMapper _mapper;
        private readonly IValidator<AddCategoryDTO> _validator;

        public CategoriesController(IRepositoryCategory repository, IMapper mapper, IValidator<AddCategoryDTO> validator)
        {
            _repository = repository;
            _mapper = mapper;
            _validator = validator;
        }




        //========================================
        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 100)
        {
            var categoryDomain = await _repository.GetAllAsync(pageNumber, pageSize);

            var categoryDTO = _mapper.Map<List<GetCategoryDTO>>(categoryDomain);

            return Ok(categoryDTO);
        }
        //========================================



        //========================================
        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            var categoryDomain = await _repository.GetByIdAsync(id);

            if (categoryDomain == null)
            {
                return NotFound("Category Not Found");
            }

            var categoryDto = _mapper.Map<GetCategoryDTO>(categoryDomain);
            return Ok(categoryDto);

        }
        //========================================



        //========================================
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] AddCategoryDTO categoryDTO)
        {
            if (categoryDTO == null)
            {
                return BadRequest();
            }

            var validateResult = await _validator.ValidateAsync(categoryDTO);
            if (!validateResult.IsValid)
            {
                throw new FluentValidation.ValidationException(validateResult.Errors);
            }

            var categoryDomain = _mapper.Map<Category>(categoryDTO);
            categoryDomain = await _repository.CreateAsync(categoryDomain);

            var categoryDto = _mapper.Map<GetCategoryDTO>(categoryDomain);

            return Ok(categoryDto);
        }
        //========================================



        //========================================
        [HttpPut]
        [Route("{id}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] AddCategoryDTO categoryDTO)
        {
            var validateResult = await _validator.ValidateAsync(categoryDTO);
            if (!validateResult.IsValid)
            {
                throw new FluentValidation.ValidationException(validateResult.Errors);
            }

            var categoryDomain = _mapper.Map<Category>(categoryDTO);

            categoryDomain = await _repository.UpdateAsync(id, categoryDomain);
            if (categoryDomain == null)
            {
                return NotFound("No any Category updated");
            }

            var categoryDto = _mapper.Map<GetCategoryDTO>(categoryDomain);
            return Ok(categoryDto);
        }
        //========================================



        //========================================
        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            var categoryDomain = await _repository.DeleteAsync(id);
            if (categoryDomain == null)
            {
                return NotFound("No any Category found for deletion");
            }

            var categoryDto = _mapper.Map<GetCategoryDTO>(categoryDomain);
            return Ok($"Category with the id, {categoryDto.Id} is deleted");
        }
        //========================================
    }
}
