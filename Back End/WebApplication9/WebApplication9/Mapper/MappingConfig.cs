using AutoMapper;
using WebApplication9.Models.Domain;
using WebApplication9.Models.DTO.Category;
using WebApplication9.Models.DTO.Post;

namespace WebApplication9.Mapper
{
    public class MappingConfig : Profile
    {
        public MappingConfig()
        {
            //Category mapping
            CreateMap<AddCategoryDTO, Category>().ReverseMap();
            CreateMap<GetCategoryDTO, Category>().ReverseMap();

            //Post mapping
            CreateMap<AddPostDTO, Post>().ReverseMap();
            CreateMap<GetPostDTO, Post>().ReverseMap();
        }
    }
}
