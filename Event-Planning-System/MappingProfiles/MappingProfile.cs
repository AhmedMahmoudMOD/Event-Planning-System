﻿using AutoMapper;
using Event_Planinng_System_DAL.Models;
using Event_Planning_System.DTO;

namespace Event_Planning_System.MappingProfiles
{
	public class MappingProfile : Profile
	{
		public MappingProfile()
		{
			CreateMap<Event, EventDTO>();
			CreateMap<User, UserDto>().ReverseMap().ForMember(dist => dist.UserName, opt => opt.MapFrom(src => src.Email));
			CreateMap<Event, EventDTO>().ForMember(dest => dest.EventDate, opt => opt.MapFrom(src => src.EventDate.ToString("yyyy-MM-dd'T'HH:mm"))).ReverseMap();
		}
	}
}
