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
		if (ModelState.IsValid)
		{
			bool success = await toDoListService.CreateToDoList(newToDoListDTO);
			if (success)
			{
				return CreatedAtAction(nameof(Get), new { eventId = newToDoListDTO.EventId, name = newToDoListDTO.Title }, newToDoListDTO);
			}
			else
			{
				return BadRequest("Failed to create to do list. Please ensure the data is correct and the deadline is valid.");
			}
		}
		return BadRequest(ModelState);
	}

	[HttpGet]
	public async Task<IActionResult> Get()
	{
		var toDoLists = await toDoListService.GetAllToDoLists();
		if (toDoLists == null)
			return NotFound("No to do lists found.");
		return Ok(toDoLists);
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

		bool success = await toDoListService.UpdateToDoList(eventId, name, newToDoList);
		if (success)
		{
			return NoContent();
		}
		else
		{
			return BadRequest("Failed to update to do list. Invalid data or to do list does not exist.");
		}
	}

}
