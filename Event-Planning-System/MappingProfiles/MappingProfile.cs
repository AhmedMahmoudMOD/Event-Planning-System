using AutoMapper;
using Event_Planinng_System_DAL.Models;
using Event_Planning_System.DTO;
using Event_Planning_System.Helpers;

namespace Event_Planning_System.MappingProfiles
{
	public class MappingProfile : Profile
	{
		public MappingProfile()
		{
			CreateMap<User, UserDto>().ReverseMap().ForMember(dist => dist.UserName, opt => opt.MapFrom(src => src.Email)).ForMember(dist => dist.Image, opt => opt.Ignore());
			CreateMap<Event, EventDTO>().ForMember(dest => dest.EventDate, opt => opt.MapFrom(src => src.EventDate.ToString("yyyy-MM-dd'T'HH:mm"))).ReverseMap();
			CreateMap<Attendance, AttendanceDTO>().ReverseMap();
			CreateMap<ToDoListDTO, ToDoList>()
					   .ReverseMap()
						.ForMember(dest => dest.DeadLineTime, opt => opt.MapFrom(src => src.DeadLineTime));


			CreateMap<User, ProfileDTO>().ReverseMap();

       CreateMap(typeof(PaginatedList<>), typeof(PaginatedList<>)).ConvertUsing(typeof(CustomPaginatedListMapper<,>));
     }

	}
}
