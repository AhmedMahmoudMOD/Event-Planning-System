using AutoMapper;
using Event_Planning_System.DTO;
using Event_Planning_System.IServices;
using Microsoft.AspNetCore.Mvc;

[Route("api/[controller]")]
[ApiController]
public class ToDoListController : ControllerBase
{
<<<<<<< Updated upstream
	private readonly IToDoListService toDoListService;
	public ToDoListController(IToDoListService _toDoListService, IMapper _mapper)
	{
		toDoListService = _toDoListService;
=======
	[Route("api/[controller]")]
	[ApiController]
	public class ToDoListController : ControllerBase
	{
		private readonly IToDoListService toDoListService;
		private readonly IMapper mapper;

		public ToDoListController(IToDoListService _toDoListService, IMapper _mapper)
		{
			toDoListService = _toDoListService;
			mapper = _mapper;
		}

		[HttpPost]
		public async Task<IActionResult> CreateToDoList(ToDoListDTO newToDoListDTO)
		{
			if (ModelState.IsValid)
			{
				if (await toDoListService.CreateToDoList(newToDoListDTO))
					return CreatedAtAction(nameof(Get), new { id = newToDoListDTO.EventId }, newToDoListDTO);
				else
					return BadRequest("Failed to create to-do list. Invalid data or deadline is in the past.");
			}
			return BadRequest(ModelState);
		}

		[HttpGet]
		public async Task<IActionResult> Get()
		{
			var toDoLists = await toDoListService.GetAllToDoLists();
			if (toDoLists == null)
				return NotFound("No to-do lists found.");
			return Ok(toDoLists);
		}

		[HttpDelete("{eventId}/{name}")]
		public async Task<IActionResult> Delete(int eventId, string name)
		{
			if (await toDoListService.DeleteToDoListSoft(eventId, name))
				return NoContent();
			return BadRequest();
		}

		[HttpPut("{eventId}/{name}")]
		public async Task<IActionResult> Update(int eventId, string name, ToDoListDTO newToDoList)
		{
			if (ModelState.IsValid)
			{
				if (await toDoListService.UpdateToDoList(eventId, name, newToDoList))
					return NoContent();
				else
					return BadRequest("Failed to update to-do list. Invalid data or to-do list does not exist.");
			}
			return BadRequest(ModelState);
		}
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
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

    [HttpDelete("{eventId}/{name}")]
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

    [HttpPut("{eventId}/{name}/status")]
    public async Task<IActionResult> UpdateToDoListStatus(int eventId, string name, bool status)
    {
        var result = await toDoListService.UpdateToDoListStatus(eventId, name, status);
        if (result.IsSuccess)
        {
            return NoContent();
        }
        else
        {
            return BadRequest("Failed to update to do list status. To do list not found.");
        }
    }

}
