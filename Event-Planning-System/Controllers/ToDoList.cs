using AutoMapper;
using Event_Planning_System.DTO;
using Event_Planning_System.IServices;
using Microsoft.AspNetCore.Mvc;

[Route("api/[controller]")]
[ApiController]
public class ToDoListController : ControllerBase
{
	private readonly IToDoListService toDoListService;
	public ToDoListController(IToDoListService _toDoListService, IMapper _mapper)
	{
		toDoListService = _toDoListService;
	}

	[HttpPost]
	public async Task<IActionResult> CreateToDoList(ToDoListDTO newToDoListDTO)
	{
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var result = await toDoListService.CreateToDoList(newToDoListDTO);
        if (result.IsSuccess)
        {
            return Ok();
        }
        return BadRequest(result.Error.Description);
    }

	[HttpGet]
	public async Task<IActionResult> GetAll()
	{
		var toDoLists =  toDoListService.GetAllToDoLists();
		if (toDoLists == null)
			return NotFound("No to do lists found.");
		return Ok(toDoLists);
	}
	[HttpGet("{eventId}")]
	public async Task<IActionResult> Get(int eventId)
	{
        var toDoLists =  toDoListService.GetRelatedToDoList(eventId);
        if (toDoLists == null)
            return NotFound("To do list not found.");
        return Ok(toDoLists);
    }
	[HttpGet("{eventId}/{name}")]
    public async Task<IActionResult> Get(int eventId, string name)
    {
        var toDoList = await toDoListService.GetToDoListByNameId(eventId, name);
        if (toDoList == null)
            return NotFound("To do list not found.");
        return Ok(toDoList);
    }

    [HttpDelete]
	public async Task<IActionResult> Delete(int eventId, string name)
	{
		if (await toDoListService.DeleteToDoListSoft(eventId, name))
			return NoContent();
		return BadRequest();
	}

	[HttpPut("{eventId}/{name}")]
	public async Task<IActionResult> UpdateToDoList(int eventId, string name, ToDoListDTO newToDoList)
	{
		if (!ModelState.IsValid)
		{
			return BadRequest(ModelState);
		}

		var result = await toDoListService.UpdateToDoList(eventId, name, newToDoList);
		if (result.IsSuccess)
		{
			return NoContent();
		}
		else
		{
			return BadRequest("Failed to update to do list. Invalid data or to do list does not exist.");
		}
	}

}
