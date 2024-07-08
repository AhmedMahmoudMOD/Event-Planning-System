using Microsoft.EntityFrameworkCore.Diagnostics;
using Event_Planinng_System_DAL.Models;
using Event_Planning_System.DTO;
using Event_Planning_System.Helpers;
using Event_Planinng_System_DAL.Enums;
using Event_Planning_System.Custom;
using Microsoft.AspNetCore.Identity;
using Event_Planinng_System_DAL.ViewModel;
using AutoMapper;
using Event_Planinng_System_DAL.Unit_Of_Work;

namespace Event_Planning_System.IServices
{
	public interface IEventService
	{
		public Task<Result> CreateEvent(EventDTO newEventDTO, int id);
		public Task<EventDTO?> GetEventById(int id);
		public Task<List<EventDTO>?> GetAllEvents(int id);
		public Task<bool> DeleteEventSoft(int id);
		public Task<bool> DeleteEventHard(int id);
		public Task<IEnumerable<AttendanceDTO>?> GetAllGuests(int id);
		public Task<bool> CheckIfGuestExists(int eventId, string email);
		public bool IsValidEmail(string email);
		public Task<bool> AddGuest(int eventId, AttendanceDTO newAttendanceDTO);
		public Task<AddGuestsResponseModelView> AddGuests(int eventId, List<AttendanceDTO> newAttendance);
		public Task<AddGuestsResponseModelView> UploadEmailsFromExcel(int EventId, IFormFile file);
		public Task<bool> SendEventMail(int EventId, EmailType type);
		public Task<bool> DeleteGuest(int eventId, string email);
		Task<Result> UpdateEvent(int id, int uid, EditEventDTO newEventDTO);

        Task<PaginatedList<EventDTO>> GetWithPagination(int pageNumber, int pageSize, string? search);
        Task<IdentityResult> AddImage(EventImageDTO imageDTO);
        Task<bool> isOwnEvent(int eventId, int userId);
        Task<List<EventDTO>?> GetAllEventsExceptUserEvents(int id);


    }
}
