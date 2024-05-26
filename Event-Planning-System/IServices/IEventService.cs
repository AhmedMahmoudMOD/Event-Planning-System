using Microsoft.EntityFrameworkCore.Diagnostics;
using Event_Planinng_System_DAL.Models;
using Event_Planning_System.DTO;
using Event_Planning_System.Helpers;
namespace Event_Planning_System.IServices
{
	public interface IEventService
	{
		public Task<bool> CreateEvent(EventDTO newEventDTO);
		public Task<EventDTO?> GetEventById(int id);
		public Task<List<EventDTO>?> GetAllEvents(int id);
		public Task<bool> DeleteEventSoft(int id);
		public Task<bool> DeleteEventHard(int id);
		public Task<IEnumerable<AttendanceDTO>?> GetAllGuests(int id);
		public Task<bool> CheckIfGuestExists(int eventId, string email);
		public Task<bool> AddGuest(int eventId, AttendanceDTO newAttendanceDTO);
		public Task<bool> AddGuests(int eventId, List<AttendanceDTO> newAttendance);
		public Task<bool> DeleteGuest(int eventId, string email);

		Task<PaginatedList<EventDTO>> GetWithPagination(int pageNumber, int pageSize, string? search);

	}
}
