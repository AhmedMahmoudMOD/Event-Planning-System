using Event_Planning_System.DTO;
using Event_Planning_System.IServices;
using Microsoft.AspNetCore.Mvc;

namespace Event_Planning_System.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RigsterController : Controller
    {
        
        readonly Iregestration _iregestration;
        public RigsterController(Iregestration iregestration) {
          this._iregestration = iregestration;
        }
        [HttpPost]
        public async Task<ActionResult> AddUser([FromBody] UserDto userDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await _iregestration.adduser(userDto);
            if (result.Succeeded)
            {
                return Ok(result.Succeeded);
            }

            foreach (var error in result.Errors)
            {
                ModelState.AddModelError(error.Code, error.Description);
            }

            return BadRequest(result.Errors);

        }
    }
    }


