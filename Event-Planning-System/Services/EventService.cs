using Event_Planinng_System_DAL.Models;
using Event_Planinng_System_DAL.Unit_Of_Work;
using Event_Planning_System.IServices;
using System.Security.Claims;
namespace Event_Planning_System.Services
{
	public class EventService : IEventService
	{
		UnitOfWork unitOfWork;
		public EventService(UnitOfWork _unitOfWork)
		{
			unitOfWork = _unitOfWork;
		}
		public bool CreateEvent(Event newEvent)
		{
			if (newEvent == null || newEvent.EventDate <= DateTime.Today)
				return false;
			newEvent.DateOfCreation = DateOnly.FromDateTime(DateTime.Today);
			newEvent.CreatorId = 1;
			//newEvent.CreatorId = int.Parse(ClaimsPrincipal.Current.FindFirst(ClaimTypes.NameIdentifier).Value);
			unitOfWork.EventRepo.Add(newEvent);
			unitOfWork.save();
			return true;
		}
	}
}
