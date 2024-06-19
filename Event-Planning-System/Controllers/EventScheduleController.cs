using Event_Planning_System.DTO.EventSchedule;
using Event_Planning_System.IServices;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Event_Planning_System.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventScheduleController : ControllerBase
    {
        private readonly IEventScheduleService EventScheduleService;
        public EventScheduleController(IEventScheduleService _EventScheduleService)
        {
            this.EventScheduleService = _EventScheduleService;
        }


        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetAllSchedulePerEvent(int id)
        {
            var model = await EventScheduleService.GetAllSchedulePerEvent(id);
            if (model == null)
            {
                return BadRequest();
            }
            return Ok(model);
        }

        //[HttpPost("crud/{id:int}")]
        //public async Task<IActionResult> CRUDOperationOnSchedule(int id , EditParams param)
        //{
        //    var model  = await EventScheduleService.CrudServiceOnSchedule(id, param);
        //    if (model == null)
        //    {
        //        return BadRequest();
        //    }
        //    return Ok(model);
        //}
        [HttpPost("Add/{id:int}")]
        public async Task<IActionResult> AddScheduleEvent(int id ,ScheduleEventData data)
        {
            var model = await EventScheduleService.addnewschedule(id, data);
            if (model == null)
            {
                return BadRequest();
            }
            return Ok(model);
        }
        [HttpPatch("delete/{id:int}")]
        public async Task<IActionResult> DeleteFromSchedule(int id , ScheduleEventData data)
        {
            var model  = await EventScheduleService.DeleteFromSchedule(id, data);
            if(model == null)
            {
                return BadRequest();
            }
            return Ok(model);
        }
    }
}
