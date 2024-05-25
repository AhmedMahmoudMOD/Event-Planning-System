using Event_Planinng_System_DAL.Models;
using System.ComponentModel.DataAnnotations;

namespace Event_Planning_System.DTO
{
	public class AttendanceDTO
	{
		[EmailAddress(ErrorMessage = "invalid email message")]
		[DataType(DataType.EmailAddress)]
		public string Email { get; set; }
		public bool IsSent { get; set; }
	}
}
