using Event_Planinng_System_DAL.Models;
using Event_Planning_System.Custom;
using Event_Planning_System.DTO;
using Event_Planning_System.Helpers;

namespace Event_Planning_System.IServices
{
	public interface IToDoListService
	{
		Task<Result> CreateToDoList(ToDoListDTO newToDoListDTO);
		List<ToDoListDTO>? GetAllToDoLists();
		Task<ToDoListDTO> GetToDoListByNameId(int eventId, string name);
		List<ToDoListDTO>? GetRelatedToDoList(int eventId);
        Task<bool> DeleteToDoListSoft(int eventId, string name);
		Task<Result> UpdateToDoList(int eventId, string name, ToDoListDTO newToDoList);
		Task<Result> UpdateToDoListStatus(int eventId, string name, bool status);

        // Task<PaginatedList<ToDoListDTO>> GetWithPagination(int pageNumber, int pageSize, string? search);
    }
}
