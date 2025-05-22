using AutoMapper;
using FluentValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc;
using WebApplication9.Models.Domain;
using WebApplication9.Models.DTO.Category;
using WebApplication9.Models.DTO.Post;
using WebApplication9.Repositeries.Interface;

namespace WebApplication9.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostsController : ControllerBase
    {
        private readonly IRepositoryPost _repository;
        private readonly IMapper _mapper;
        private readonly IValidator<AddPostDTO> _validator;

        public PostsController(IRepositoryPost repository, IMapper mapper, IValidator<AddPostDTO> validator)
        {
            _repository = repository;
            _mapper = mapper;
            _validator = validator;
        }




        //==========================================
        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 3)
        {
            var (postDomain, totalPosts) = await _repository.GetAllAsync(pageNumber, pageSize);

            var postDTO = _mapper.Map<List<GetPostDTO>>(postDomain);

            return Ok(new { posts = postDTO, totalPages = (int)Math.Ceiling((double)totalPosts / pageSize) });
        }
        //==========================================



        //==========================================
        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            var postDomain = await _repository.GetByIdAsync(id);

            if (postDomain == null)
            {
                return NotFound("Post Not Found");
            }

            var postDto = _mapper.Map<GetPostDTO>(postDomain);
            return Ok(postDto);

        }
        //==========================================



        //==========================================
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] AddPostDTO postDTO)
        {
            if (postDTO == null)
            {
                return BadRequest();
            }

            var validateResult = await _validator.ValidateAsync(postDTO);
            if (!validateResult.IsValid)
            {
                throw new FluentValidation.ValidationException(validateResult.Errors);
            }

            var postDomain = _mapper.Map<Post>(postDTO);
            postDomain = await _repository.CreateAsync(postDomain);

            var postDto = _mapper.Map<GetPostDTO>(postDomain);

            return Ok(postDto);
        }
        //==========================================





        //==========================================
        [HttpPut]
        [Route("{id}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] AddPostDTO postDTO)
        {
            var validateResult = await _validator.ValidateAsync(postDTO);
            if (!validateResult.IsValid)
            {
                throw new FluentValidation.ValidationException(validateResult.Errors);
            }

            var postDomain = _mapper.Map<Post>(postDTO);

            postDomain = await _repository.UpdateAsync(id, postDomain);
            if (postDomain == null)
            {
                return NotFound("No any Post updated");
            }

            var postDto = _mapper.Map<GetPostDTO>(postDomain);
            return Ok(postDto);
        }
        //==========================================




        //==========================================
        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            var postDomain = await _repository.DeleteAsync(id);
            if (postDomain == null)
            {
                return NotFound("No any Post found for deletion");
            }

            var postDto = _mapper.Map<GetPostDTO>(postDomain);
            return Ok($"Post with the id, {postDto.Id} is deleted");
        }
        //==========================================
    }
}
