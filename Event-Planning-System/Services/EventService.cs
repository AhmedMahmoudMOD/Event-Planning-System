using AutoMapper;
using Event_Planinng_System_DAL.Enums;
using Event_Planinng_System_DAL.Models;
using Event_Planinng_System_DAL.Unit_Of_Work;
using Event_Planning_System.DTO;
using Event_Planning_System.DTO.Mail;
using Event_Planning_System.Helpers;
using Event_Planning_System.IServices;
using Microsoft.Extensions.Logging;
using MimeKit.Cryptography;
using System.Security.Claims;
namespace Event_Planning_System.Services
{
	public class EventService : IEventService
	{
		UnitOfWork unitOfWork;
		private readonly IMapper mapper;
		readonly ISendEmailService emailService;
		public EventService(UnitOfWork _unitOfWork, IMapper _mapper, ISendEmailService _emailService)
		{
			unitOfWork = _unitOfWork;
			mapper = _mapper;
			emailService = _emailService;
		}

		public async Task<bool> SendEventMail(int EventId, EmailType type)
		{
			try
			{
				//var AttendanceList = mapper.Map<List<Attendance>>(emailAdressDtos);
				Event myEvent = await unitOfWork.EventRepo.FindById(EventId);
				var allAttendees = (await unitOfWork.AttendanceRepo.GetAll());
				List<Attendance> emailAdresses;
				string mailbody = "";
				string mailSubject = "";

				if (type == EmailType.Invite && myEvent.IsDeleted == false)
				{
					emailAdresses = allAttendees.Where(a => a.EventId == EventId && a.IsSent == false).ToList();
					mailbody = $"<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\r\n        <tr>\r\n            <td align=\"center\" style=\"padding: 10px 0 30px 0;\">\r\n                <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"600\">\r\n                    <tr>\r\n                        <td align=\"center\" bgcolor=\"#70bbd9\" style=\"padding: 40px 0 30px 0;\">\r\n                            <h1 style=\"color: white;\">You're Invited!</h1>\r\n                        </td>\r\n                    </tr>\r\n                    <tr>\r\n                        <td bgcolor=\"#ffffff\" style=\"padding: 40px 30px 40px 30px;\">\r\n                            <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\r\n                                <tr>\r\n                                    <td>\r\n <p>We are excited to invite you to our upcoming event. Please find the details below:</p>\r\n                                        <p><strong>Event:</strong> {myEvent.Name}</p>\r\n                                        <p><strong>Date:</strong> {myEvent.EventDate.Date}</p>\r\n                                        <p><strong>Time:</strong> {myEvent.EventDate.TimeOfDay}</p>\r\n                                        <p><strong>Location:</strong> {myEvent.Location}, {myEvent.GoogleMapsLocation}</p>\r\n                                        <p>We hope you can join us for this special occasion.</p>\r\n                                        <p>Looking forward to seeing you there!</p>\r\n                                        <p>Best regards,</p>\r\n                                        <p>{myEvent.CreatorNavigation.FName} {myEvent.CreatorNavigation.LName}</p>\r\n                                        <p></p>\r\n                                    </td>\r\n                                </tr>\r\n                                <tr>\r\n                                    <td align=\"center\" style=\"padding: 20px 0 30px 0;\">\r\n                                        <p></p>\r\n                                    </td>\r\n                                </tr>\r\n                            </table>\r\n                        </td>\r\n                    </tr>\r\n                    <tr>\r\n                        <td bgcolor=\"#70bbd9\" style=\"padding: 30px 30px 30px 30px;\">\r\n                            <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\r\n                                <tr>\r\n                                    <td align=\"center\" style=\"color: white;\">\r\n                                        <p>&copy; 2024 Event Planning Company. All rights reserved.</p>\r\n                                    </td>\r\n                                </tr>\r\n                            </table>\r\n                        </td>\r\n                    </tr>\r\n                </table>\r\n            </td>\r\n        </tr>\r\n    </table>";
					mailSubject = "Glad to Invite you to our Event!";
				}
				else if (type == EmailType.Cancel)
				{
					emailAdresses = allAttendees.Where(a => a.EventId == EventId && a.IsSent == true).ToList();
					mailbody = $"<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\r\n        <tr>\r\n            <td align=\"center\" style=\"padding: 10px 0 30px 0;\">\r\n                <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"600\">\r\n                    <tr>\r\n                        <td align=\"center\" bgcolor=\"#ff6b6b\" style=\"padding: 40px 0 30px 0;\">\r\n                            <h1 style=\"color: white;\">Event Cancellation Notice</h1>\r\n                        </td>\r\n                    </tr>\r\n                    <tr>\r\n                        <td bgcolor=\"#ffffff\" style=\"padding: 40px 30px 40px 30px;\">\r\n                            <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\r\n                                <tr>\r\n                                    <td>\r\n                                        <h2>Greetings, </h2>\r\n                                        <p>We regret to inform you that the following event has been cancelled:</p>\r\n                                        <p><strong>Event:</strong> {myEvent.Name}</p>\r\n                                        <p><strong>Original Date:</strong> {myEvent.EventDate.Date}</p>\r\n                                        <p>We apologize for any inconvenience this may cause. If you have any questions or need further information, please do not hesitate to contact us at {myEvent.CreatorNavigation.Email}.</p>\r\n                                        <p>Thank you for your understanding.</p>\r\n                                        <p>Best regards,</p>\r\n                                        <p>{myEvent.CreatorNavigation.FName} {myEvent.CreatorNavigation.LName}</p>\r\n                                        <p>Event Planning System</p>\r\n                                    </td>\r\n                                </tr>\r\n                                <tr>\r\n                                    <td align=\"center\" style=\"padding: 20px 0 30px 0;\">\r\n                                        <a href=\"#\" style=\"padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none;\">Contact Us</a>\r\n                                    </td>\r\n                                </tr>\r\n                            </table>\r\n                        </td>\r\n                    </tr>\r\n                    <tr>\r\n                        <td bgcolor=\"#ff6b6b\" style=\"padding: 30px 30px 30px 30px;\">\r\n                            <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\r\n                                <tr>\r\n                                    <td align=\"center\" style=\"color: white;\">\r\n                                        <p>&copy; 2024 Event Planning Company. All rights reserved.</p>\r\n                                    </td>\r\n                                </tr>\r\n                            </table>\r\n                        </td>\r\n                    </tr>\r\n                </table>\r\n            </td>\r\n        </tr>\r\n    </table>";
					mailSubject = "Event Cancellation.";
				}
				else if (type == EmailType.ThankYou)
				{
					emailAdresses = allAttendees.Where(a => a.EventId == EventId && a.IsSent == true).ToList();
					mailbody = $"<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\r\n        <tr>\r\n            <td align=\"center\" style=\"padding: 10px 0 30px 0;\">\r\n                <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"600\">\r\n                    <tr>\r\n                        <td align=\"center\" bgcolor=\"#28a745\" style=\"padding: 40px 0 30px 0;\">\r\n                            <h1 style=\"color: white;\">Thank You for Attending!</h1>\r\n                        </td>\r\n                    </tr>\r\n                    <tr>\r\n                        <td bgcolor=\"#ffffff\" style=\"padding: 40px 30px 40px 30px;\">\r\n                            <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\r\n                                <tr>\r\n                                    <td>\r\n                                        <h2>Greetings, </h2>\r\n                                        <p>We wanted to take a moment to thank you for attending {myEvent.Name} on {myEvent.EventDate.Date}.</p>\r\n                                        <p>We hope you found the event enjoyable and informative. Your presence made the event special and successful.</p>\r\n                                        <p>If you have any feedback or suggestions, please feel free to share them with us at eventplanningsys@gmail.com.</p>\r\n                                        <p>We look forward to seeing you at our future events!</p>\r\n                                        <p>Best regards,</p>\r\n                                        <p>{myEvent.CreatorNavigation.FName} {myEvent.CreatorNavigation.LName}</p>\r\n                                        <p></p>\r\n                                    </td>\r\n                                </tr>\r\n                                <tr>\r\n                                    <td align=\"center\" style=\"padding: 20px 0 30px 0;\">\r\n                                        <a href=\"#\" style=\"padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none;\">Give Feedback</a>\r\n                                    </td>\r\n                                </tr>\r\n                            </table>\r\n                        </td>\r\n                    </tr>\r\n                    <tr>\r\n                        <td bgcolor=\"#28a745\" style=\"padding: 30px 30px 30px 30px;\">\r\n                            <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\r\n                                <tr>\r\n                                    <td align=\"center\" style=\"color: white;\">\r\n                                        <p>&copy; 2024 Event Planning Company. All rights reserved.</p>\r\n                                    </td>\r\n                                </tr>\r\n                            </table>\r\n                        </td>\r\n                    </tr>\r\n                </table>\r\n            </td>\r\n        </tr>\r\n    </table>";
					mailSubject = "Thank you for Attending our event!";
				}
				else
					return false;

				if (emailAdresses == null || !emailAdresses.Any())
					return false;

				foreach (var attendee in emailAdresses)
				{
					var email = new SendEmailDto
					{
						Sender = new EmailAdressDto { Email = null, Name = "EPP" },
						Recipient = new EmailAdressDto { Email = attendee.Email, Name = "" },
						Subject = mailSubject,
						Body = mailbody
					};
					var emailresult = emailService.SendEmail(email);
					attendee.IsSent = true;
					unitOfWork.save();
				}
				return true;
			}
			catch { return false; }
		}

		// Get Event by its ID 
		public async Task<EventDTO?> GetEventById(int id)
		{
			try
			{
				var AttendanceOfEvent = await unitOfWork.AttendanceRepo.GetAll();
				var EventImages = await unitOfWork.EventImagesRepo.GetAll();

				var AllEventAttendce  = AttendanceOfEvent.Where(x=>x.EventId == id && x.IsSent==true).Select(x=>x.Email);
				var AllEventImages = EventImages.Where(x => x.EventId == id).Select(y=>y.EventImage);

				Event eventFounded = await unitOfWork.EventRepo.FindById(id);
				if (eventFounded == null) return null;
				EventDTO Modal  = mapper.Map<EventDTO>(eventFounded);
				Modal.Emails = AllEventAttendce.ToList();
				Modal.EventImages = AllEventImages.ToList();
				return Modal;
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
				await SendEventMail(id, EmailType.Cancel);
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
		public async Task<string> AddGuests(int eventId, List<AttendanceDTO> newAttendancesDTO)
		{
			if (newAttendancesDTO == null)
				return "Invalid data, Sent an empty list";
			Event myEvent = await unitOfWork.EventRepo.FindById(eventId);

			int attendeesno = (await unitOfWork.AttendanceRepo.GetAll()).Where(a => a.EventId == eventId).Count();
			if (newAttendancesDTO.Count() >= (myEvent.AttendanceNumber - attendeesno))
				return $"You cant add more guests, you invited ({attendeesno} of total {myEvent.AttendanceNumber}, you can invite {myEvent.AttendanceNumber - attendeesno})";
			foreach (AttendanceDTO guest in newAttendancesDTO)
				if (!await AddGuest(eventId, guest))
					return "failed to add guest";
			await SendEventMail(eventId, EmailType.Invite);
			return "true";
		}
		// Delete guest from the event
		public async Task<bool> DeleteGuest(int eventId, string email)
		{
			try
			{
				var guest = (await unitOfWork.AttendanceRepo.GetAll()).FirstOrDefault(g => g.EventNavigation.Id == eventId && g.Email == email);
				if (guest == null)
					return false;
				await SendEventMail(eventId, EmailType.Cancel);
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
