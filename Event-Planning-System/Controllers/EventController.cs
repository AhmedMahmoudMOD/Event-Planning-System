using Event_Planning_System.IServices;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Event_Planinng_System_DAL.Models;
using Event_Planning_System.DTO;
using Event_Planning_System.MappingProfiles;
using AutoMapper.Internal;
using AutoMapper;

namespace Event_Planning_System.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class EventController : ControllerBase
	{
		private readonly IEventService eventService;
		private readonly IMapper mapper;
		public EventController(IEventService _eventService,IMapper _mapper)
		{
			eventService = _eventService;
			mapper = _mapper;
		}
		[HttpPost]
		public IActionResult CreateEvent(EventDTO newEventDTO)
		{
			Event newEvent = mapper.Map<Event>(newEventDTO);

			if (eventService.CreateEvent(newEvent))
				return Created();
			return BadRequest();
		}
	}
}
