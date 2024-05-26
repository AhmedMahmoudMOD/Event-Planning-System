using Event_Planning_System.DTO;
using Event_Planning_System.DTO.Mail;
using Event_Planning_System.IServices;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics.Eventing.Reader;

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
                return BadRequest("User not found");
            }
            var result = await authService.ValidateEmailToken(user,confirmEmailDto.Token);
            if (result.Succeeded)
            {
                return Ok("Email confirmed");
            }
            return BadRequest("Email not confirmed");
        }

        [HttpPost]
        [Route("forgetpassword")]
        public async Task<IActionResult> ForgetPassword(string email)
        {
             var result = await authService.SendPasswordResetEmail(email);
            if (result.IsSend)
            {
                return Ok("Email sent");//200
            }
            return BadRequest("Email not sent");//400
        }

        [HttpPost]
        [Route("resetpassword")]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordDTO resetPasswordDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid data");
            }
            else
            {
               var result = await authService.ResetPassword(resetPasswordDto);
                if (result.Succeeded)
                {
                    return Ok("Password reset");
                }
                return BadRequest("Password not reset");
            }
        }
    }
}
