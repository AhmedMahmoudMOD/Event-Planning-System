using Event_Planinng_System_DAL.Models;

namespace Event_Planning_System.IServices
{
    public interface IaccountServices
    {
        Task<string> GenerateToken(User user);
    }
}
