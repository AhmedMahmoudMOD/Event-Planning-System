using Event_Planinng_System_DAL.Enums;
using Event_Planning_System.DTO;
using Event_Planning_System.DTO.UserRequset;
using Event_Planning_System.IServices;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.FileProviders;
using Swashbuckle.AspNetCore.Annotations;

namespace Event_Planning_System.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersRequestsController : ControllerBase
    {
        private readonly IUserRequestService UserRequestServices;
       

        public UsersRequestsController(IUserRequestService _user)
        {
            this.UserRequestServices = _user;
           
        }
        [SwaggerOperation(Summary = "Add A new Request", Description = "Adding Request by Userid && eventId You dont need status")]
        [SwaggerResponse(201, "created successfully", typeof(UserRequestDTO))]
        [SwaggerResponse(404, "can be due to this user is the one that created the event so wactch out")]
        [HttpPost]
        public async Task<IActionResult> AddRequest( UserRequestDTO userRequest)
        {
            var model  = await UserRequestServices.CreateRequest(userRequest.UserId, userRequest.EventId);
            if(model == null)
            {
                return NotFound();
            }
            return Created("The Request Is created",model);
        }

        [SwaggerOperation(Summary = "Delete Request", Description = "deleting Request by Userid && eventId You dont need status")]
        [SwaggerResponse(200, "deleted successfully")]
        [SwaggerResponse(500, "can be due to the request is already accepted or rejected or no request exist")]
        [HttpDelete]
        public async Task<IActionResult> DeleteRequest( UserRequestDTO userRequest)
        {
            var model = await UserRequestServices.DeleteRequset(userRequest.UserId, userRequest.EventId);
            return model ? Ok() : StatusCode(500);
        }

        [SwaggerOperation(Summary = "get all Requests", Description = "getting Request by Userid && eventId ")]
        [SwaggerResponse(200, "deleted successfully", typeof(List<UserRequestDeatilsDTO>))]
        [HttpGet("{eventid:int}")]
        public async Task<IActionResult> GetAllRequests([FromRoute]int eventid ,[FromQuery] RequestStatus status)
        {
            var model = await UserRequestServices.GetAllUsersRequests(eventid, status);
            return Ok(model);
        }

        [SwaggerOperation(Summary = "Editing Request", Description = "Editing Request by Userid && eventId You dont need status")]
        [SwaggerResponse(200, "Changed")]
        [SwaggerResponse(404, "can be due to this request doesn't exist")]
        [HttpPut]
        public async Task<IActionResult> ChangeRequestStatus(UserRequestDTO userRequest)
        {
            var result = await UserRequestServices.ChangeStatus(userRequest);

            if (result == true && userRequest.RequestStatus == RequestStatus.Accepted)
            {
                if (await UserRequestServices.SendInviteEmail(userRequest))
                {
                    return Ok();
                }
                else
                {
                   return BadRequest();
                }
            }else if(result == true && userRequest.RequestStatus==RequestStatus.Rejected)
            {
                return Ok();
            }
            else
            {
                return BadRequest();
            }




        }
        [HttpGet("{eventid:int}/{userid:int}")]
        public async Task<IActionResult> GetSpecificRequest (int eventid , int userid)
        {
           var req = await UserRequestServices.GetSpecificUserRequest(eventid, userid);
            if(req == null  )
            {
                return NotFound();
            }

            if (req.RequestStatus == RequestStatus.Accepted)
            {
                return Ok(1);
            }
            else if (req.RequestStatus == RequestStatus.Rejected)
            {
                return Ok(2);
            }
            else
            {
                return Ok(0);
            }
        }
    }
}
