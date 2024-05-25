using Event_Planning_System.IServices;
using Microsoft.AspNetCore.Mvc;
using Event_Planning_System.DTO;
using AutoMapper;
using Event_Planinng_System_DAL.Models;
using System.Text.RegularExpressions;
using Event_Planinng_System_DAL.Enums;

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
		[HttpGet("Attendance")]
		public async Task<IActionResult> GetAttendance(int id)
		{
			var guests = await eventService.GetAllGuests(id);
			if (guests != null)
				return Ok(guests);
			return NotFound();
		}
		[HttpPost("Attendance")]
		public async Task<IActionResult> AddAttendace(int eventId, List<AttendanceDTO> newAttendancesDTO)
		{
			if (ModelState.IsValid)
			{
				if (await eventService.AddGuests(eventId, newAttendancesDTO))
					return Created();
				else
					return BadRequest("Failed to add guest. Invalid data or event does not exist, or Email was added before");
			}
			return BadRequest(ModelState);
		}
		[HttpDelete("Attendance")]
		public async Task<IActionResult> DeleteAttendee(int eventId, string email)
		{
			try { var addr = new System.Net.Mail.MailAddress(email); }
			catch { return BadRequest("Invalid email address"); }

			if (await eventService.DeleteGuest(eventId, email))
				return Ok();
			return BadRequest($"{email} is not invited to the Event with id {eventId} or th Event id is incorrect");
		}
	}
}
