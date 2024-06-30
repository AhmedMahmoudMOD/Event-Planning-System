using AutoMapper;
using Event_Planinng_System_DAL.Enums;
using Event_Planinng_System_DAL.Models;
using Event_Planinng_System_DAL.Unit_Of_Work;
using Event_Planning_System.DTO;
using Event_Planning_System.DTO.Mail;
using Event_Planning_System.Helpers;
using Event_Planning_System.IServices;
using Event_Planning_System.Custom;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using MimeKit.Cryptography;
using System.Security.Claims;
using Microsoft.AspNetCore.Identity;
using Event_Planinng_System_DAL.ViewModel;
using System.Net.Mail;
using Azure;
using System.Text.RegularExpressions;

namespace Event_Planning_System.Services
{
	public class EventService : IEventService
	{
		UnitOfWork unitOfWork;
		private readonly IMapper mapper;
		readonly ISendEmailService emailService;
		private readonly IBlobServices blobServices;

		public EventService(UnitOfWork _unitOfWork, IMapper _mapper, ISendEmailService _emailService, IBlobServices blobServices)
		{
			unitOfWork = _unitOfWork;
			mapper = _mapper;
			emailService = _emailService;
			this.blobServices = blobServices;
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
					mailbody = $"<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\r\n        <tr>\r\n            <td align=\"center\" style=\"padding: 10px 0 30px 0;\">\r\n                <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"600\">\r\n                    <tr>\r\n                        <td style=\"background-color: #c9fff1; padding: 40px 30px 40px 30px;\">\r\n                            <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\r\n                                <tr>\r\n                                    <td align=\"center\" style=\"padding: 0 0 20px 0;\">\r\n                                        <img src=\"../../Event-Planning-System-Angular/src/assets/images/Invite-bro.svg\" alt=\"Event Image\" style=\"width:50%; height: auto; border-radius: 10px;\" />\r\n                                    </td>\r\n                                </tr>\r\n                                <tr>\r\n                                    <td style=\"font-family: Arial, sans-serif; color: #333333;\">\r\n                                        <p>We are excited to invite you to our upcoming event. Please find the details below:</p>\r\n                                        <p><strong>Event:</strong> {myEvent.Name}</p>\r\n                                        <p><strong>Date:</strong> {myEvent.EventDate.Date}</p>\r\n                                        <p><strong>Time:</strong> {myEvent.EventDate.TimeOfDay}</p>\r\n                                        <p><strong>Location:</strong> {myEvent.Location}, <a href=\"{myEvent.GoogleMapsLocation}\" style=\"color: #70bbd9;\">View on Google Maps</a></p>\r\n                                        <p>We hope you can join us for this special occasion.</p>\r\n                                        <p>Looking forward to seeing you there!</p>\r\n                                        <p>Best regards,</p>\r\n                                        <p>{myEvent.CreatorNavigation.FName} {myEvent.CreatorNavigation.LName}</p>\r\n       <a href='http://localhost:5006/api/Event/print/{EventId}'>Download as PDF</a>\r\n                                   </td>\r\n                                </tr>\r\n                                <tr>\r\n                                    <td align=\"center\" style=\"padding: 20px 0 30px 0;\">\r\n                                        <p></p>\r\n                                    </td>\r\n                                </tr>\r\n                            </table>\r\n                        </td>\r\n                    </tr>\r\n                    <tr>\r\n                        <td style=\"background-color: rgb(23, 83, 42);padding: 30px 30px 30px 30px;\">\r\n                            <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\r\n                                <tr>\r\n                                    <td align=\"center\" style=\"color: white; font-family: Arial, sans-serif;\">\r\n                                        <p>&copy; 2024 Event Planning Company. All rights reserved.</p>\r\n                                    </td>\r\n                                </tr>\r\n                            </table>\r\n                        </td>\r\n                    </tr>\r\n                </table>\r\n            </td>\r\n        </tr>\r\n    </table>";
					mailSubject = "Glad to Invite you to our Event!";
				}
				else if (type == EmailType.Cancel)
				{
					emailAdresses = allAttendees.Where(a => a.EventId == EventId && a.IsSent == true).ToList();
					mailbody = $" <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\"  width=\"100%\">\r\n        <tr>\r\n            <td align=\"center\" style=\"padding: 10px 0 30px 0;\">\r\n                <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"600\">\r\n                    <tr>\r\n                        <td style=\"background-color: #ff6b6b; padding: 40px 30px 40px 30px;\">\r\n                            <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\r\n                                <tr>\r\n                                    <td align=\"center\" style=\"padding: 0 0 20px 0;\">\r\n                                        <img src=\"../../Event-Planning-System-Angular/src/assets/images/Cancelled event-pana.svg\" alt=\"Cancellation Image\" style=\"width: 50%; height: auto; border-radius: 10px;\" />\r\n                                    </td>\r\n                                </tr>\r\n                                <tr>\r\n                                    <td style=\"font-family: Arial, sans-serif; color: #333333;\">\r\n                                        <h2 style=\"font-family: Arial, sans-serif; color: white;\">Greetings,</h2>\r\n                                        <p>We regret to inform you that the following event has been cancelled:</p>\r\n                                        <p><strong>Event:</strong> {myEvent.Name}</p>\r\n                                        <p><strong>Original Date:</strong> {myEvent.EventDate.Date}</p>\r\n                                        <p>We apologize for any inconvenience this may cause. If you have any questions or need further information, please do not hesitate to contact us at <a href=\"mailto:{myEvent.CreatorNavigation.Email}\" style=\"color: white;\">{myEvent.CreatorNavigation.Email}</a>.</p>\r\n                                        <p>Thank you for your understanding.</p>\r\n                                        <p>Best regards,</p>\r\n                                        <p>{myEvent.CreatorNavigation.FName} {myEvent.CreatorNavigation.LName}</p>\r\n                                        <p>Event Planning System</p>\r\n                                    </td>\r\n                                </tr>\r\n                                <tr>\r\n                                    <td align=\"center\" style=\"padding: 20px 0 30px 0;\">\r\n                                        <a href=\"mailto:{myEvent.CreatorNavigation.Email}\" style=\"padding: 10px 20px; background-color: rgb(97, 129, 204); color: white; text-decoration: none; border-radius: 5px;\">Contact Us</a>\r\n                                    </td>\r\n                                </tr>\r\n                            </table>\r\n                        </td>\r\n                    </tr>\r\n                    <tr>\r\n                        <td style=\"background-color: rgb(65, 4, 4); padding: 30px 30px 30px 30px;\">\r\n                            <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\r\n                                <tr>\r\n                                    <td align=\"center\" style=\"color: rgb(255, 255, 255); font-family: Arial, sans-serif;\">\r\n                                        <p>&copy; 2024 Event Planning Company. All rights reserved.</p>\r\n                                    </td>\r\n                                </tr>\r\n                            </table>\r\n                        </td>\r\n                    </tr>\r\n                </table>\r\n            </td>\r\n        </tr>\r\n    </table>";
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
						Sender = new EmailAdressDto { Email = "abdullah.aiman.elsheshtawy@gmail.com", Name = "EPP" },
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

				var AllEventAttendce = AttendanceOfEvent.Where(x => x.EventId == id && x.IsSent == true).Select(x => new AttendanceDTO() { Email = x.Email });
				var AllEventImages = EventImages.Where(x => x.EventId == id).Select(y => y.EventImage);

				Event eventFounded = await unitOfWork.EventRepo.FindById(id);
				if (eventFounded == null) return null;

				EventDTO Modal = mapper.Map<EventDTO>(eventFounded);
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
				User userToSearch = await unitOfWork.UserRepo.FindById(id);
				if (userToSearch == null)
					return null;
				List<Event> userEvents = (await unitOfWork.EventRepo.GetAll()).Where(a => a.CreatorId == id && !a.IsDeleted).ToList();
				return mapper.Map<List<EventDTO>>(userEvents);
			}
			catch { return null; }
		}

		// Create new event
		public async Task<bool> CreateEvent(EventDTO newEventDTO, int id)
		{
			Event newEvent;
			try { newEvent = mapper.Map<Event>(newEventDTO); }
			catch { return false; }

			if (newEvent == null || newEvent.EventDate <= DateTime.Today || newEvent.EndDate <= newEvent.EventDate)
				return false;



			newEvent.DateOfCreation = DateOnly.FromDateTime(DateTime.Today);

			// ============= CreatorId should be the id of the logged in user ============= //
			newEvent.CreatorId = id;

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
		//edit event
		public async Task<Result> UpdateEvent(int id, EditEventDTO newEventDTO)
		{
			var oldEvent = await unitOfWork.EventRepo.FindById(id);
			if (oldEvent == null)
				return Result.Failure(new Error("400", "Event not found"));

			Event newEvent;
			try { newEvent = mapper.Map<Event>(newEventDTO); }
			catch { return Result.Failure(new Error("400", "Invalid data")); }

			if (newEvent == null || newEvent.EventDate <= DateTime.Today)
				return Result.Failure(new Error("400", "Invalid date"));
			if (newEvent.AttendanceNumber < oldEvent.AttendanceNumber)
			{
				return Result.Failure(new Error("400", "You can't reduce the number of attendees"));
			}

			oldEvent.Name = newEvent.Name;
			oldEvent.Description = newEvent.Description;
			oldEvent.EventDate = newEvent.EventDate;
			oldEvent.DateOfCreation = DateOnly.FromDateTime(DateTime.Today);
			oldEvent.Location = newEvent.Location;
			oldEvent.GoogleMapsLocation = newEvent.GoogleMapsLocation;
			oldEvent.Budget = newEvent.Budget;
			oldEvent.CreatorId = 1;
			oldEvent.AttendanceNumber = newEvent.AttendanceNumber;
			oldEvent.EndDate = newEvent.EndDate;



			try
			{
				await unitOfWork.EventRepo.Edit(oldEvent);
				await unitOfWork.saveAsync();
				return Result.Success();
			}
			catch (Exception)
			{
				return Result.Failure(new Error("400", "Failed to update event"));
			}
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
		// Check if mail is valid
		private bool IsValidEmail(string email)
		{
			var emailRegex = new Regex(@"^[^@\s]+@[^@\s]+\.[^@\s]+$");
			return emailRegex.IsMatch(email);
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
			if (!IsValidEmail(newAttendanceDTO.Email)) { return false; }

			//if (!await CheckIfGuestExists(eventId, newAttendance.Email)) // Check if guest already exists
			//{
			//	await SendEventMail(eventId, EmailType.Invite);
			//	return true;
			//}
			await unitOfWork.AttendanceRepo.Add(newAttendance);
			unitOfWork.save();
			return true;
		}
		// Add multiple guests to the event
		public async Task<AddGuestsResponseModelView> AddGuests(int eventId, List<AttendanceDTO> newAttendancesDTO)
		{
			var res = new AddGuestsResponseModelView();
			res.Success = false;
			if (newAttendancesDTO == null)
			{
				res.Message = "Invalid data, Sent an empty list";
				res.Success = false;
				return res;
			}
			// Check if the event exists
			Event myEvent;
			try { myEvent = await unitOfWork.EventRepo.FindById(eventId); }
			catch
			{
				res.Message = "Invalid Event Id";
				return res;
			}
			// Check if the number of attendees is less than the remaining number of attendees
			int attendeesno = (await unitOfWork.AttendanceRepo.GetAll()).Where(a => a.EventId == eventId).Count();
			List<AttendanceDTO> distinctEmails = newAttendancesDTO.Distinct().ToList(); // to get distinct emails

			if (distinctEmails.Count() >= (myEvent.AttendanceNumber - attendeesno))
			{
				res.Message = $"You cant add more guests, you invited ({attendeesno} of total {myEvent.AttendanceNumber}, you can invite {myEvent.AttendanceNumber - attendeesno})";
				return res;
			}
			// Add guests

			foreach (var guest in distinctEmails)
			{
				if (!IsValidEmail(guest.Email))
				{
					res.InvalidEmails.Add(guest.Email);
					continue;
				}

				if (await CheckIfGuestExists(eventId, guest.Email))
				{
					res.DuplicateEmails.Add(guest.Email);
					continue;
				}

				if (!await AddGuest(eventId, guest))
				{
					res.InvalidEmails.Add(guest.Email);
					continue;
				}

				await SendEventMail(eventId, EmailType.Invite);
				res.SuccessfulEmails.Add(guest.Email);
			}
			res.Success = res.SuccessfulEmails.Any();
			res.Message = res.Success ? "Some guests were added successfully." : "All provided emails were invalid or duplicates.";
			return res;
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

		public async Task<IdentityResult> AddImage(EventImageDTO imageDTO)
		{
			var url = await blobServices.AddingImage(imageDTO.Image);

			await Console.Out.WriteLineAsync(url);

			if (url == null)
			{
				return IdentityResult.Failed(new IdentityError { Code = "400", Description = "Failed to upload image" });
			}

			await unitOfWork.EventImagesRepo.Add(new EventImages { EventImage = url, EventId = imageDTO.Id });

			return IdentityResult.Success;

		}

		public async Task<bool> isOwnEvent(int eventId, int userId)
		{
			var model = await unitOfWork.EventRepo.FindById(eventId);

			if (model.CreatorId == userId)
			{
				return true;
			}
			return false;
		}
	}
}

