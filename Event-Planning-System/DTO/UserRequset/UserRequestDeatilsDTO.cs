using Event_Planinng_System_DAL.Enums;
using System.ComponentModel.DataAnnotations;

namespace Event_Planning_System.DTO.UserRequset
{
    public class UserRequestDeatilsDTO
    {
        public int Id { get; set; }
        [StringLength(50, MinimumLength = 3, ErrorMessage = "enter a string between 3 and 50")]
        public string FName { get; set; }
        [StringLength(50, MinimumLength = 3, ErrorMessage = "enter a string between 3 and 50")]
        public string LName { get; set; }
        [EmailAddress]
        public string Email { get; set; }
        public string? Image { get; set; }
        public RequestStatus RequestStatus { get; set; }

    }
}
