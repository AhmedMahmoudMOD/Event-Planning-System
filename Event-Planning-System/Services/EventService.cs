using AutoMapper;
using Event_Planinng_System_DAL.Models;
using Event_Planinng_System_DAL.Unit_Of_Work;
using Event_Planning_System.DTO;
using Event_Planning_System.DTO.Mail;
using Event_Planning_System.Helpers;
using Event_Planning_System.IServices;
using System.Security.Claims;
namespace Event_Planning_System.Services
{
	public class EventService : IEventService
	{
		UnitOfWork unitOfWork;
		private readonly IMapper mapper;
		ISendEmailService emailService;
		public EventService(UnitOfWork _unitOfWork, IMapper _mapper, ISendEmailService _emailService)
		{
			unitOfWork = _unitOfWork;
			mapper = _mapper;
			emailService = _emailService;
		}

//		public async Task<bool> SendInvitationMail(int EventId, List<AttendanceDTO> emailAdressDtos)
//		{
//			try
//			{
//				var AttendanceList = mapper.Map<List<Attendance>>(emailAdressDtos);
//				Event myEvent =
//				var emailAdresses = (await unitOfWork.AttendanceRepo.GetAll()).Where(a => a.EventId == EventId && a.IsSent == false);
//				if (emailAdresses == null || emailAdresses.Count() == 0 || AttendanceList == null || AttendanceList.Count() == 0)
//					return false;
//				foreach (var attendee in AttendanceList)
//				{
//					var email = new SendEmailDto
//					{
//						Sender = new EmailAdressDto { Email = "kingabdo391@gmail.com", Name = "EPP" },
//						Recipient = new EmailAdressDto { Email = attendee.Email, Name = "" },
//						Subject = "Invitaion mail",
//						Body = $"Please confirm your email by clicking on the link below <br> <a href='{emailurl}'>Click here</a>"
//					};
//				}

//				var emailresult = sendEmailService.SendEmail(email);
//)			}
//			catch { return false; }
//		}

		// Get Event by its ID 
		public async Task<EventDTO?> GetEventById(int id)
		{
			try
			{
				Event eventFounded = await unitOfWork.EventRepo.FindById(id);
				if (eventFounded == null) return null;
				return mapper.Map<EventDTO>(eventFounded);
			}
			catch
			{
				return null;
			}
		}
		// Get All Events 
		public async Task<List<EventDTO>?> GetAllEvents(int id)
		{
			try
			{
				List<Event> userEvents = (await unitOfWork.EventRepo.GetAll()).Where(a => a.CreatorId == id).ToList();
				if (userEvents == null)
					return null;
				return mapper.Map<List<EventDTO>>(userEvents);
			}
			catch { return null; }
		}

		// Create new event
		public async Task<bool> CreateEvent(EventDTO newEventDTO)
		{
			Event newEvent;
			try { newEvent = mapper.Map<Event>(newEventDTO); }
			catch { return false; }

			if (newEvent == null || newEvent.EventDate <= DateTime.Today)
				return false;

			newEvent.DateOfCreation = DateOnly.FromDateTime(DateTime.Today);

			// ============= CreatorId should be the id of the logged in user ============= //
			newEvent.CreatorId = 1;

			await unitOfWork.EventRepo.Add(newEvent);
			unitOfWork.save();
			return true;
		}
		// Soft delete event 
		public async Task<bool> DeleteEventSoft(int id)
		{
			// Cancellation mail sent to all guests (Will search)
			try
			{
				Event delEvent = await unitOfWork.EventRepo.FindById(id);
				// SendCancellationMail Function for the event.
				delEvent.IsDeleted = true;
				unitOfWork.save();
				return true;
			}
			catch { return false; }
		}
		// Delete event From DB
		public async Task<bool> DeleteEventHard(int id)
		{
			try
			{
				Event delEvent = await unitOfWork.EventRepo.FindById(id);
				await unitOfWork.EventRepo.Delete(delEvent);
				unitOfWork.save();
				return true;
			}
			catch { return false; }
		}
		//---------------------------------------------------------------------------------------------//
		// ------------------------------------------- Guests ----------------------------------------//
		//-------------------------------------------------------------------------------------------//

		// Get all guests of the event either mail is sent or not
		public async Task<IEnumerable<AttendanceDTO>?> GetAllGuests(int id)
		{
			try
			{
				if (await unitOfWork.EventRepo.FindById(id) == null)
					return null;
				var guests = (await unitOfWork.AttendanceRepo.GetAll()).Where(a => a.EventNavigation.Id == id);
				return mapper.Map<IEnumerable<AttendanceDTO>>(guests);
			}
			catch { return null; }
		}
		// Check if guest already exists in the event
		public async Task<bool> CheckIfGuestExists(int eventId, string email)
		{
			var guests = await unitOfWork.AttendanceRepo.GetAll();
			return guests.Any(g => g.EventNavigation.Id == eventId && g.Email == email);
		}
		public async Task<bool> AddGuest(int eventId, AttendanceDTO newAttendanceDTO)
		{
			Attendance newAttendance;
			try
			{
				newAttendance = mapper.Map<Attendance>(newAttendanceDTO);
				newAttendance.EventNavigation = await unitOfWork.EventRepo.FindById(eventId);
			}
			catch { return false; }

			if (await CheckIfGuestExists(eventId, newAttendance.Email)) // Check if guest already exists
				return false;

			await unitOfWork.AttendanceRepo.Add(newAttendance);
			unitOfWork.save();
			return true;
		}
		// Add multiple guests to the event
		public async Task<bool> AddGuests(int eventId, List<AttendanceDTO> newAttendancesDTO)
		{
			if (newAttendancesDTO == null)
				return false;
			foreach (AttendanceDTO guest in newAttendancesDTO)
				if (!await AddGuest(eventId, guest))
					return false;
			return true;
		}
		// Delete guest from the event
		public async Task<bool> DeleteGuest(int eventId, string email)
		{
			try
			{
				var guest = (await unitOfWork.AttendanceRepo.GetAll()).FirstOrDefault(g => g.EventNavigation.Id == eventId && g.Email == email);
				if (guest == null)
					return false;
				await unitOfWork.AttendanceRepo.Delete(guest);
				unitOfWork.save();
				return true;
			}
			catch { return false; }
		}

		// pagination function

		public async Task<PaginatedList<EventDTO>> GetWithPagination(int pageNumber, int pageSize, string? search)
		{
			IQueryable<Event> query = unitOfWork.EventRepo.GetAllQuery();

			if (!string.IsNullOrEmpty(search))
			{
				query = query.Where(e => e.Name.Contains(search) || e.Description.Contains(search) || e.Location.Contains(search));
			}

			var eventsList = await PaginatedList<Event>.ToPagedList(query, pageNumber, pageSize);

			var eventDTOList = mapper.Map<PaginatedList<EventDTO>>(eventsList);

			return eventDTOList;
		}
	}

}
