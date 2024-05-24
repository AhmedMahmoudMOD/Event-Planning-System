using AutoMapper;
using Event_Planinng_System_DAL.Models;
using Event_Planning_System.DTO;

namespace Event_Planning_System.MappingProfiles
{
	public class MappingProfile : Profile
	{
		public MappingProfile()
		{
			CreateMap<Event, EventDTO>();
			CreateMap<User,UserDto>().ReverseMap();
		}
	}
}
