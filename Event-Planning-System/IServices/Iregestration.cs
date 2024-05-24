using Event_Planning_System.DTO;

namespace Event_Planning_System.IServices
{
    public interface Iregestration
    {
        Task AddUserAsync(UserDto userDto, string password);


    }
}
