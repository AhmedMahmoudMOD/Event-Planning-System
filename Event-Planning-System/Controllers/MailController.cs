using AutoMapper;
using Event_Planning_System.DTO.Mail;
using Event_Planning_System.IServices;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using System.Net.Mail;

namespace Event_Planning_System.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class MailController : ControllerBase
    {
        ISendEmailService Mailer;
        public MailController(ISendEmailService _m)
        {
            Mailer = _m;
        }
        [HttpPost]
        [SwaggerOperation(Summary = "Send an email", Description = "Send an email with the specified details." )]
        [SwaggerResponse(200, "Email sent successfully", typeof(EmailDetailsDto))]
        [SwaggerResponse(400, "Invalid input data or error during email sending")]
        public IActionResult Send([FromBody]SendEmailDto sendemail)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                var response  = Mailer.SendEmail(sendemail);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
