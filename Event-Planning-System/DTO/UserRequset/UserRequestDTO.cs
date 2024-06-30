using Event_Planinng_System_DAL.Enums;
using System.ComponentModel.DataAnnotations.Schema;

namespace Event_Planning_System.DTO.UserRequset
{
    public class UserRequestDTO
    {
        public int UserId { get; set; }
        public int EventId { get; set; }
        public RequestStatus? RequestStatus { get; set; }
    }
}
