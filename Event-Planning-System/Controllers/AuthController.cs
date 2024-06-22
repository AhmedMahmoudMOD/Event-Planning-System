using Event_Planning_System.DTO;
using Event_Planning_System.DTO.Mail;
using Event_Planning_System.IServices;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics.Eventing.Reader;
using System.Security.Claims;

namespace Event_Planning_System.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase

    {
        private readonly IAuthService authService;

        public AuthController(IAuthService authService)
        {
            this.authService = authService;
        }

        [HttpPost]
        [Route("emailconfirm")]
        public async Task<IActionResult> EmailConfirm([FromBody] ConfirmEmailDto confirmEmailDto)
        {
            var user = await  authService.GetUserByEmail(confirmEmailDto.Email);
            if (user == null)
            {
                return BadRequest(new JsonResult("User not found"));
            }
            var result = await authService.ValidateEmailToken(user,confirmEmailDto.Token);
            if (result.Succeeded)
            {
                return Ok(new JsonResult("Email confirmed"));
            }
            return BadRequest(new JsonResult("Email not confirmed"));
        }

        [HttpPost]
        [Route("forgotpassword")]
        public async Task<IActionResult> ForgetPassword([FromQuery]string email)
        {
             var result = await authService.SendPasswordResetEmail(email);
            if (result.IsSend)
            {
                return Ok(new JsonResult("Email sent"));//200
            }
            return BadRequest(new JsonResult("Email sent"));//400
        }

        [HttpPost]
        [Route("resetpassword")]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordDTO resetPasswordDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new JsonResult("Invalid data"));
            }
            else
            {
               var result = await authService.ResetPassword(resetPasswordDto);
                if (result.Succeeded)
                {
                    return Ok(new JsonResult("Password reset"));
                }
                return BadRequest(new JsonResult("Password not reset"));
            }
        }

        [HttpGet]
        [Route("jwt")]
        public async Task<IActionResult> Jwt()
        {
            var UserModel = User.FindFirstValue(ClaimTypes.NameIdentifier);

            return Ok(new JsonResult(UserModel));
        }
    }
}
