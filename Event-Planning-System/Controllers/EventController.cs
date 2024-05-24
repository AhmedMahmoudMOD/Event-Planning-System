using Event_Planning_System.IServices;
using Microsoft.AspNetCore.Mvc;
using Event_Planning_System.DTO;
using AutoMapper;

namespace Event_Planning_System.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class EventController : ControllerBase
	{
		private readonly IEventService eventService;
		public EventController(IEventService _eventService, IMapper _mapper)
		{
			eventService = _eventService;
		}
		[HttpPost]
		public async Task<IActionResult> CreateEvent(EventDTO newEventDTO)
		{
			if (ModelState.IsValid)
			{
				if (await eventService.CreateEvent(newEventDTO))
					return Created();
				else
					return BadRequest("Failed to create event. Invalid data or event date is in the past.");
			}
			return BadRequest(ModelState);
		}
		[HttpDelete]
		public async Task<IActionResult> DeleteEvent(int id)
		{
			if (await eventService.DeleteEventSoft(id))
				return Created();
			return BadRequest();
		}

	}
}
