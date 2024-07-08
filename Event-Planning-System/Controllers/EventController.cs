using Event_Planning_System.IServices;
using Microsoft.AspNetCore.Mvc;
using Event_Planning_System.DTO;
using AutoMapper;
using Event_Planinng_System_DAL.Models;
using System.Text.RegularExpressions;
using Event_Planinng_System_DAL.Enums;
using Event_Planning_System.DTO.Mail;
using Swashbuckle.AspNetCore.Annotations;
using Event_Planning_System.Services;
using Event_Planning_System.Custom;
using System.Security.Claims;

namespace Event_Planning_System.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class EventController : ControllerBase
	{
		private readonly IEventService eventService;
		private readonly IPDFService pDFService;

		public EventController(IEventService _eventService, IMapper _mapper, IPDFService PDFService)
		{
			eventService = _eventService;
			pDFService = PDFService;
		}

		// Get All Event for a user
		[SwaggerOperation(Summary = "Get all events", Description = "Get all events by user's ID.")]
		[SwaggerResponse(200, "Retrieved successfully", typeof(List<EventDTO>))]
		[SwaggerResponse(400, "Failed to retrieve events. Invalid Id.")]
		[HttpGet("user/{id:int}")]
		public async Task<IActionResult> GetAllEventsByUserID([FromRoute] int id)
		{
			var requiredEvents = await eventService.GetAllEvents(id);
			if (id == 0 || requiredEvents == null)
			{
				return NotFound("Invalid ID.");
			}

			return Ok(requiredEvents);
		}

		// Get Event By ID
		[SwaggerOperation(Summary = "Get Event by its ID", Description = "Get Event Details by its ID.")]
		[SwaggerResponse(200, "retrieved successfully", typeof(EventDTO))]
		[SwaggerResponse(400, "Failed to retrieve event. Invalid Id.")]
		[HttpGet("{id:int}")]
		public async Task<IActionResult> GetEventByID(int id)
		{
			if (ModelState.IsValid)
			{
				EventDTO? requiredEvent = await eventService.GetEventById(id);
				if (requiredEvent != null)
					return Ok(requiredEvent);
				else
					return BadRequest("Failed to retrieve event. Invalid Id.");
			}
			return BadRequest(ModelState);
		}
		// Create new Event
		[SwaggerOperation(Summary = "Create new Event", Description = "Create New Event with the required details.")]
		[SwaggerResponse(200, "Event created successfully")]
		[HttpPost]
		public async Task<IActionResult> CreateEvent(EventDTO newEventDTO)
		{
			var sid = User.FindFirstValue(ClaimTypes.NameIdentifier);

			if (sid == null)
			{
				return Unauthorized();
			}

			int id = int.Parse(sid);

			if (ModelState.IsValid)
			{
				var res = await eventService.CreateEvent(newEventDTO, id);
				if (res.IsSuccess)
					return Created();
				else
					return BadRequest("Failed to create event. Invalid data or event date is in the past.");
			}
			return BadRequest(ModelState);
		}
		// delete Event
		[SwaggerOperation(Summary = "Delete Event", Description = "Delete Event and send cancellation mail to the Attendace.")]
		[SwaggerResponse(200, "Event Deleted successfully")]
		[HttpDelete]
		public async Task<IActionResult> DeleteEvent(int id)
		{
			if (await eventService.DeleteEventSoft(id))
				return Created();
			return BadRequest();
		}
		// Update Event
		[SwaggerOperation(Summary = "Update Event", Description = "Update Event with new details.")]
		[SwaggerResponse(200, "Event updated successfully")]
		[HttpPut("{id:int}")]
		public async Task<IActionResult> UpdateEvent(int id, EditEventDTO newEvent)
		{
            var sid = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (sid == null)
            {
                return Unauthorized();
            }

            int uid = int.Parse(sid);
            if (ModelState.IsValid)
			{
				var res = await eventService.UpdateEvent(id,uid, newEvent);
				if (res.IsSuccess)
					return Ok();  // Return Ok instead of Created for updates
				else
					return BadRequest(new { error = res.Error.Description });
			}
			return BadRequest(ModelState);
		}

		// Get Event Attendance
		[SwaggerOperation(Summary = "Get the Event's Attendance", Description = "Get a list of all Attendees' mails.")]
		[SwaggerResponse(200, "Retrieved all mails successfully")]
		[HttpGet("Attendance")]
		public async Task<IActionResult> GetAttendance(int id)
		{
			var guests = await eventService.GetAllGuests(id);
			if (guests != null)
				return Ok(guests);
			return NotFound();
		}
		// add Attendance to event
		[SwaggerOperation(Summary = "Add list of attendees", Description = "Add new list of attendees to the Event.")]
		[SwaggerResponse(200, "Attendance was added successfully")]
		[HttpPost("Attendance/{eventId:int}")]
		public async Task<IActionResult> AddAttendace(int eventId, [FromBodyAttribute] List<AttendanceDTO> newAttendancesDTO)
		{
			if (ModelState.IsValid)
			{
				var res = await eventService.AddGuests(eventId, newAttendancesDTO);
				if (res.Success)
					return Ok(res);
				else
					return BadRequest(res);
			}
			return BadRequest(ModelState);
		}

		[SwaggerOperation(Summary = "Add list of attendees from Excel sheet", Description = "Add new list of attendees to the Event.")]
		[SwaggerResponse(200, "Attendance was added successfully")]
		[HttpPost("Attendance/upload/{eventId:int}")]
		public async Task<IActionResult> AddAttendaceFromExcel(int eventId, IFormFile attendanceSheet)
		{
			if (ModelState.IsValid)
			{
				if (attendanceSheet == null || attendanceSheet.Length == 0)
				{
					return BadRequest("No file uploaded.");
				}
				else
				{
						return Ok(await eventService.UploadEmailsFromExcel(eventId, attendanceSheet));
				}
			}
			return BadRequest(ModelState);
		}

		// Remove attendance from an event
		[SwaggerOperation(Summary = "Remove Attendance from the Event", Description = "Delete an existing attendees.")]
		[SwaggerResponse(200, "Event created successfully", typeof(EventDTO))]
		[HttpDelete("Attendance")]
		public async Task<IActionResult> DeleteAttendee(int eventId, string email)
		{
			try { var addr = new System.Net.Mail.MailAddress(email); }
			catch { return BadRequest("Invalid email address"); }

			if (await eventService.DeleteGuest(eventId, email))
				return Ok();
			return BadRequest($"{email} is not invited to the Event with id {eventId} or th Event id is incorrect");
		}

		// paginataion endpoint

		[HttpGet("page")]
		public async Task<IActionResult> GetWithPagination(int pageNumber = 1, int pageSize = 3, string? searchTerm = null)
		{
			var events = await eventService.GetWithPagination(pageNumber, pageSize, searchTerm);
			if (events == null)
				return NotFound();

			var data = new
			{
				events.CurrentPage,
				events.TotalPages,
				events.TotalCount,
				events.HasPrevious,
				events.HasNext,
				events
			};
			return Ok(data);
		}

		[HttpPost("addImage")]
		public async Task<IActionResult> AddImage([FromForm] EventImageDTO imageDTO)
		{
			if (imageDTO.Image == null)
			{
				return BadRequest("No image provided");
			}
			try
			{
				var result = await eventService.AddImage(imageDTO);
				return Ok(result);
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}

		[HttpGet("check/{eventId:int}/{userId:int}")]
		public async Task<IActionResult> IsOwnEvent(int eventId, int userId)
		{
			var result = await eventService.isOwnEvent(eventId, userId);
			if (!result)
				return Ok(false);
			return Ok(true);

		}

		[HttpGet("print/{eventId:int}")]
		public async Task<IActionResult> PrintEvent(int eventId)
		{
			var result = await pDFService.PrintPDF(eventId);
			if (result != null)
				return result;
			return BadRequest();

		}

        /* Get All Events except user events */

        [SwaggerOperation(Summary = "Get all events except user Events", Description = "Get all events except user Events")]
        [SwaggerResponse(200, "Retrieved successfully", typeof(List<EventDTO>))]
        [SwaggerResponse(400, "Failed to retrieve events. Invalid Id.")]
        [SwaggerResponse(404, "User not found or no events available.")]
        [HttpGet("UsersEvents/{id:int}")]
        public async Task<IActionResult> GetAllEventsExceptUserEvents([FromRoute] int id)
        {
            if (id < 0)
            {
                return BadRequest("Invalid ID.");
            }

            var requiredEvents = await eventService.GetAllEventsExceptUserEvents(id);

            if (requiredEvents == null || !requiredEvents.Any())
            {
                return NotFound("User not found or no events available.");
            }

            return Ok(requiredEvents);
        }



    }

}
