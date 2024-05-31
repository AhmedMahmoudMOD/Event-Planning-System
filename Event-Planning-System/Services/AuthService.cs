using Event_Planinng_System_DAL.Models;
using Event_Planinng_System_DAL.Unit_Of_Work;
using Event_Planning_System.DTO;
using Event_Planning_System.DTO.Mail;
using Event_Planning_System.IServices;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.EntityFrameworkCore.Infrastructure.Internal;
using Microsoft.EntityFrameworkCore.SqlServer.Query.Internal;
using Microsoft.Identity.Client.Extensibility;

namespace Event_Planning_System.Services
{
    public class AuthService : IAuthService
    {
        private readonly UnitOfWork unitOfWork;
        private readonly ISendEmailService sendEmailService;

        public AuthService(UnitOfWork unitOfWork,ISendEmailService sendEmailService)
        {
            this.unitOfWork = unitOfWork;
            this.sendEmailService = sendEmailService;
        }

        public async Task<User> GetUserByEmail(string email)
        {
            return await unitOfWork.UserRepo.FindByEmail(email);

        }

        public async Task<IdentityResult> ValidateEmailToken(User user ,string token)
        {
            var result = await unitOfWork.UserRepo.ValidateEmailToken(user, token);
            if (result.Succeeded)
            {
                return IdentityResult.Success;
            }
            return IdentityResult.Failed(new IdentityError { Description = "Email not confirmed" });
        }

        public async Task<EmailDetailsDto> SendPasswordResetEmail(string email)
        {
            var user = await GetUserByEmail(email);
            if (user == null)
            {
                return new EmailDetailsDto { IsSend = false };
            }
            else
            {
                var url = await unitOfWork.UserRepo.ForgetPasswordAsync(user);
                if (url != null)
                {
                    var PrepEmail = new SendEmailDto
                    {
                        Sender = new EmailAdressDto { Email = "Edo0@outlook.com", Name = "EPP" },
                        Recipient = new EmailAdressDto { Email = user.Email, Name = user.FName },
                        Subject = "Password Reset",
                        Body = $"Please Click The Link in order to reset your password <br> <a href='{url}'>Click here</a>"
                    };


                    var emailresult = sendEmailService.SendEmail(PrepEmail);
                    return emailresult;
                }
                return new EmailDetailsDto { IsSend = false };
            }
        }
        public async Task<IdentityResult> ResetPassword(ResetPasswordDTO resetPasswordDTO)
        {
            var user = await GetUserByEmail(resetPasswordDTO.Email);
            if (user == null)
            {
                return IdentityResult.Failed(new IdentityError { Description = "User not found" });
            }
            else
            {
                var result = await unitOfWork.UserRepo.ResetPasswordAsync(user, resetPasswordDTO.Token, resetPasswordDTO.NewPassword);
                if (result.Succeeded)
                {
                    return IdentityResult.Success;
                }
                return IdentityResult.Failed(new IdentityError { Description = "Password not reset" });
            }
        }
    }
}
