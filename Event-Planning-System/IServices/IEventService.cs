using Microsoft.EntityFrameworkCore.Diagnostics;
using Event_Planinng_System_DAL.Models;
namespace Event_Planning_System.IServices
{
	public interface IEventService
	{
		public bool CreateEvent(Event newEvent);
	}
}
