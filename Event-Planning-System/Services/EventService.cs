using AutoMapper;
using Event_Planinng_System_DAL.Models;
using Event_Planinng_System_DAL.Unit_Of_Work;
using Event_Planning_System.DTO;
using Event_Planning_System.Helpers;
using Event_Planning_System.IServices;
using System.Security.Claims;
namespace Event_Planning_System.Services
{
	public class EventService : IEventService
	{
		UnitOfWork unitOfWork;
		private readonly IMapper mapper;
		public EventService(UnitOfWork _unitOfWork, IMapper _mapper)
		{
			unitOfWork = _unitOfWork;
			mapper = _mapper;
		}
		public async Task<bool> CreateEvent(EventDTO newEventDTO)
		{
			Event newEvent;
			try { newEvent = mapper.Map<Event>(newEventDTO); }
			catch { return false; }

			if (newEvent == null || newEvent.EventDate <= DateTime.Today)
				return false;
			
			newEvent.DateOfCreation = DateOnly.FromDateTime(DateTime.Today);
			newEvent.CreatorId = 1;
			
			//newEvent.CreatorId = int.Parse(ClaimsPrincipal.Current.FindFirst(ClaimTypes.NameIdentifier).Value);
			
			await unitOfWork.EventRepo.Add(newEvent);
			unitOfWork.save();
			return true;
		}

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

		public async Task<PaginatedList<EventDTO>> GetWithPagination(int pageNumber, int pageSize, string? search)
        {
            IQueryable<Event> query = unitOfWork.EventRepo.GetAllQuery();

			if (!string.IsNullOrEmpty(search))
			{
				query = query.Where(e => e.Name.Contains(search) || e.Description.Contains(search) || e.Location.Contains(search));
			}

            var eventsList =  await PaginatedList<Event>.ToPagedList(query, pageNumber, pageSize);

			var eventDTOList = mapper.Map<PaginatedList<EventDTO>>(eventsList);

            return eventDTOList;
        }
    }
}
