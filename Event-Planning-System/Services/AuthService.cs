using Event_Planinng_System_DAL.Models;
using Event_Planinng_System_DAL.Unit_Of_Work;
using Event_Planning_System.IServices;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.EntityFrameworkCore.Infrastructure.Internal;
using Microsoft.Identity.Client.Extensibility;

namespace Event_Planning_System.Services
{
    public class AuthService : IAuthService
    {
        private readonly UnitOfWork unitOfWork;

        public AuthService(UnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
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
    }
}
