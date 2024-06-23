using AutoMapper;
using Event_Planinng_System_DAL.Models;
using Event_Planinng_System_DAL.Unit_Of_Work;
using Event_Planning_System.Custom;
using Event_Planning_System.DTO;
using Event_Planning_System.Helpers;
using Event_Planning_System.IServices;
using Microsoft.EntityFrameworkCore;

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
		public async Task<Result> CreateToDoList(ToDoListDTO newToDoListDTO)
		{
			// Check if the EventId exists in the Events table
			var eventExists = db.Events.FirstOrDefault(e => e.Id == newToDoListDTO.EventId);
			if (eventExists == null)
			{
                return Result.Failure(new Error("400", "Event not found"));
            }
            DateTime dateNow = DateTime.Now;
			DateTime eventDeadline = eventExists.EndDate;
			DateTime eventDate = eventExists.EventDate;
            if (newToDoListDTO.DeadLineTime <= dateNow || newToDoListDTO.DeadLineTime > eventDeadline || newToDoListDTO.DeadLineTime < eventDate)
			{
                return Result.Failure(new Error("400", "Invalid deadline"));
            }
			ToDoList newToDoList;
			try
			{
				newToDoList = mapper.Map<ToDoList>(newToDoListDTO);
			}
			catch
			{
                return Result.Failure(new Error("400", "Failed to map the object"));
            }
			try
			{
				await unitOfWork.ToDoListRepo.Add(newToDoList);
				unitOfWork.save();
				return Result.Success();
			}
            catch
            {
                return Result.Failure(new Error("400", "Failed to add the object"));
            }
        }


		//get all to do lists
		public  List<ToDoListDTO>? GetAllToDoLists()
		{
			try
			{
				List<ToDoList> toDoLists =  db.ToDoLists.ToList();
                if (toDoLists == null)
                {
                    return null;
                }
                var TDLists = mapper.Map<List<ToDoListDTO>>(toDoLists);
				if (TDLists == null)
                    return null;
				return TDLists;
            }
            catch
            {
                return null;
            }

        }

		//get to do list by event id && name
		public async Task<ToDoListDTO> GetToDoListByNameId(int eventId, string name)
		{
			var toDoList = db.ToDoLists.FirstOrDefault(x => x.EventId == eventId && x.Title == name);
			if (toDoList == null)
			{
                return null;
            }
            var TDList = mapper.Map<ToDoListDTO>(toDoList);
            return TDList;

        }
		public  List<ToDoListDTO> GetRelatedToDoList(int eventId)
		{
			var toDoLists = db.ToDoLists.Where(x => x.EventId == eventId).ToList();
            if (toDoLists == null)
            {
                return null;
            }
            var TDLists = mapper.Map<List<ToDoListDTO>>(toDoLists);
            return TDLists;
        }
		//update to do list
		public async Task<Result> UpdateToDoList(int eventId, string name, ToDoListDTO newToDoList)
		{
			if(newToDoList.DeadLineTime <= DateTime.Now)
                return Result.Failure(new Error("400", "Invalid deadline"));
            var currentToDoList = await db.ToDoLists.FirstOrDefaultAsync(x => x.EventId == eventId && x.Title == name);
			if (currentToDoList.DeadLineTime <= DateTime.Now)
				return Result.Failure(new Error("400", "can't edit todo list"));
			if (currentToDoList == null)
				return Result.Failure(new Error("400", "To do list not found"));

            mapper.Map(newToDoList, currentToDoList);
			db.Entry(currentToDoList).State = EntityState.Modified;

			try
			{
				await unitOfWork.saveAsync();
				return Result.Success();
            }
			catch (Exception ex)
			{
				
				return Result.Failure(new Error("400", ex.Message));
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
