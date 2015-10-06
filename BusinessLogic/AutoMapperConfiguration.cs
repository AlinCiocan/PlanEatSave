using AutoMapper;
using Entities.BoardEntities;
using Entities.UserEntities;
using ViewModels.BoardModels;
using ViewModels.UserModels;

namespace BusinessLogic
{
    public class AutoMapperConfiguration
    {
        public static void Initialize()
        {
            ConfigureMappingsBetweenEntitiesAndModels();
        }

        private static void ConfigureMappingsBetweenEntitiesAndModels()
        {
            /*
             * Entity ->(to) Model
             *  and also reverse
             * Model ->(to) Entity
             */

            Mapper.CreateMap<BoardEntity, BoardViewModel>().ReverseMap();
            Mapper.CreateMap<DayEntity, DayViewModel>().ReverseMap();
            Mapper.CreateMap<CategoryEntity, CategoryViewModel>().ReverseMap();
            Mapper.CreateMap<ItemEntity, ItemViewModel>().ReverseMap();

            Mapper.CreateMap<UserEntity, UserViewModel>().ReverseMap();
        }
    }
}
