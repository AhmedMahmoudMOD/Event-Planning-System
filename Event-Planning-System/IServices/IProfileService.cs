using Event_Planning_System.DTO;
using Event_Planning_System.Helpers;
using Event_Planning_System.Services;

namespace Event_Planning_System.IServices
{
    public interface IProfileService
    {
        Task<ProfileDTO> GetProfileById(int id);
        Task<ProfileDTO> GetProfileByEmail(string email);
        Task<ProfileDTO> EditProfile(int id, ProfileDTO profileDTO);
        Task<ProfileDTO> DeleteProfile(int id);

        Task<PaginatedList<ProfileDTO>> GetAllUsersWithPagination(int pageNumber, int pageSiz);
    }
}
