using Event_Planinng_System_DAL.Models;
using Microsoft.AspNetCore.Identity;

namespace Event_Planning_System.IServices
{
    public interface IAuthService
    {
        Task<User> GetUserByEmail(string email);

        Task<IdentityResult> ValidateEmailToken(User user,string token);


    }
}
