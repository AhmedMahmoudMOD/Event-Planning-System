using System.ComponentModel.DataAnnotations;
using Event_Planinng_System_DAL.Model_Validations;
using Event_Planinng_System_DAL.Models;
namespace Event_Planning_System.DTO
{
    public class UserDto
    {
        [Required]
        [RegularExpression(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%?&])[A-Za-z\d@$!%?&]{8,}$", ErrorMessage ="Invaild Password")]
        public string  Password { get; set; }
        [Required]

        [Compare("Password", ErrorMessage = "The password and confirmation password do not match.")]
        public string ConfirmPassword { get; set; }
        [EmailAddress]
        public string Email { get; set; }

        [Required]

        [StringLength(50, MinimumLength = 3, ErrorMessage = "First name must be between 3 and 50 characters.")]
        public string FName { get; set; }

        [StringLength(50, MinimumLength = 3, ErrorMessage = "Last name must be between 3 and 50 characters.")]
        public string LName { get; set; }

        [Required]
        [RegularExpression(@"(01)[0125][0-9]{8}$", ErrorMessage = "Phone number must be a vaild phone number")]
        public string PhoneNumber { get; set; }

        [StringLength(50, MinimumLength = 3, ErrorMessage = "Street must be between 3 and 50 characters.")]
        public string? Street { get; set; }

        [StringLength(50, MinimumLength = 3, ErrorMessage = "City must be between 3 and 50 characters.")]
        public string? City { get; set; }

        [StringLength(50, MinimumLength = 3, ErrorMessage = "Region must be between 3 and 50 characters.")]
        public string? Region { get; set; }

        [RegularExpression(@"^\d{5}$", ErrorMessage = "Postal code must be exactly 5 digits.")]
        public int? PostalCode { get; set; }

        [PastDate]

        public DateOnly DateOfBirth { get; set; }

        public IFormFile? Image { get; set; }


    }
}
