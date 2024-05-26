using AutoMapper;
using Event_Planinng_System_DAL.Models;
using Event_Planinng_System_DAL.Unit_Of_Work;
using Event_Planning_System.DTO;
using Event_Planning_System.Helpers;
using Event_Planning_System.IServices;

namespace Event_Planning_System.Services
{
	public class ToDoListService : IToDoListService
	{
		UnitOfWork unitOfWork;
		private readonly IMapper mapper;
		private readonly dbContext db;
		public ToDoListService(UnitOfWork _unitOfWork, IMapper _mapper, dbContext db)
		{
			unitOfWork = _unitOfWork;
			mapper = _mapper;
			this.db = db;
		}

		// Create new to do list
		public async Task<bool> CreateToDoList(ToDoListDTO newToDoListDTO)
		{
			ToDoList newToDoList;
			try { newToDoList = mapper.Map<ToDoList>(newToDoListDTO); }
			catch { return false; }

			if (newToDoList == null || newToDoList.DeadLineTime == DateOnly.FromDateTime(DateTime.Now))
				return false;

			await unitOfWork.ToDoListRepo.Add(newToDoList);
			unitOfWork.save();
			return true;
		}

		//get all to do lists
		public async Task<IEnumerable<ToDoListDTO>?> GetAllToDoLists()
		{
			var toDoLists = await unitOfWork.ToDoListRepo.GetAll();
			if (toDoLists == null)
				return null;
			return mapper.Map<IEnumerable<ToDoListDTO>>(toDoLists);
		}

		//get to do list by event id && name
		public async Task<ToDoList> GetToDoList(int eventId, string name)
		{
			return db.ToDoLists.FirstOrDefault(x => x.EventId == eventId && x.Title == name);
		}
		//update to do list
		public async Task<bool> UpdateToDoList(int eventId, string name, ToDoListDTO newToDoList)
		{
			ToDoList currentToDoList = db.ToDoLists.FirstOrDefault(x => x.EventId == eventId && x.Title == name);
			if (currentToDoList == null)
				return false;
			else
			{
				currentToDoList = mapper.Map<ToDoList>(newToDoList);
				unitOfWork.save();
				return true;
			}
		}

		//delete to do list
		public async Task<bool> DeleteToDoListSoft(int eventId, string name)
		{
			try
			{
				ToDoList delToDoList = db.ToDoLists.FirstOrDefault(x => x.EventId == eventId && x.Title == name);
				if (delToDoList == null)
					return false;
				db.ToDoLists.Remove(delToDoList);
				unitOfWork.save();
				return true;
			}
			catch { return false; }
		}




	}
}
