using Event_Planinng_System_DAL.Models;
using Event_Planning_System.DTO;
using Event_Planning_System.DTO.Mail;
using Microsoft.AspNetCore.Identity;

namespace Event_Planning_System.IServices
{
    public interface IAuthService
    {
        Task<User> GetUserByEmail(string email);

        Task<IdentityResult> ValidateEmailToken(User user,string token);

        Task<EmailDetailsDto> SendPasswordResetEmail(string email);

        Task<IdentityResult> ResetPassword(ResetPasswordDTO resetPasswordDTO);


    }
}
