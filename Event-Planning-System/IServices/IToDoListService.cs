using Event_Planinng_System_DAL.Models;
using Event_Planning_System.DTO;
using Event_Planning_System.Helpers;

namespace Event_Planning_System.IServices
{
	public interface IToDoListService
	{
		Task<bool> CreateToDoList(ToDoListDTO newToDoListDTO);
		Task<IEnumerable<ToDoListDTO>?> GetAllToDoLists();
		Task<ToDoList> GetToDoList(int eventId, string name);
		Task<bool> DeleteToDoListSoft(int eventId, string name);
		Task<bool> UpdateToDoList(int eventId, string name, ToDoListDTO newToDoList);
		// Task<PaginatedList<ToDoListDTO>> GetWithPagination(int pageNumber, int pageSize, string? search);
	}
}
