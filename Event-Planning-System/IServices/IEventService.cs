using Microsoft.EntityFrameworkCore.Diagnostics;
using Event_Planinng_System_DAL.Models;
using Event_Planning_System.DTO;
namespace Event_Planning_System.IServices
{
	public interface IEventService
	{
		public Task<bool> CreateEvent(EventDTO newEventDTO);
		public Task<bool> DeleteEventSoft(int id);
		public Task<bool> DeleteEventHard(int id);
	}
}
