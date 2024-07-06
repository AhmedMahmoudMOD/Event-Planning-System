using Event_Planinng_System_DAL.Enums;
using Event_Planning_System.DTO.UserRequset;

namespace Event_Planning_System.IServices
{
    public interface IUserRequestService
    {
        public Task<UserRequestDTO?> CreateRequest(int userid, int eventid);
        public Task<bool> DeleteRequset(int userid, int eventid);
        public Task<List<UserRequestDeatilsDTO>> GetAllUsersRequests(int eventid, RequestStatus status);
        public Task<bool> ChangeStatus(UserRequestDTO userDTO);

        Task<bool> SendInviteEmail(UserRequestDTO userRequest);

        Task<UserRequestDTO> GetSpecificUserRequest(int eventid, int userid);

    }
}
