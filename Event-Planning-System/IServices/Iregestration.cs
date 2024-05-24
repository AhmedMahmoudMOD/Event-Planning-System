using Event_Planning_System.DTO;
using Microsoft.AspNetCore.Identity;

namespace Event_Planning_System.IServices
{
    public interface Iregestration
    {
        Task<IdentityResult> adduser(UserDto user);


    }
}
