using Event_Planinng_System_DAL.Model_Validations;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Event_Planinng_System_DAL.Models
{
    public class User : IdentityUser<int>
    {

        [StringLength(50, MinimumLength = 3, ErrorMessage = "enter a string between 3 and 50")] 
        public string FName { get; set; }
        [StringLength(50, MinimumLength = 3, ErrorMessage = "enter a string between 3 and 50")]
        public string LName { get; set; }

        [StringLength(50, MinimumLength = 3, ErrorMessage = "enter a string between 3 and 50")]
        public string? Street { get; set; }
        [StringLength(50, MinimumLength = 3, ErrorMessage = "enter a string between 3 and 50")]
        public string? City { get; set; }
        [StringLength(50, MinimumLength = 3, ErrorMessage = "enter a string between 3 and 50")]
        public string? Region { get; set; }
        [RegularExpression(@"^\d{5}$", ErrorMessage = "Postal code must be exactly 5 digits")]
        public int? PostalCode { get; set; }
        [PastDate]
        public DateOnly DateOfBirth { get; set; }

        public bool IsDeleted { get; set; }
        public string? Image { get; set; }
        public virtual List<Comments> CommentsNavigation { get; set; } = new List<Comments>();
        public virtual List<Event> CreateEventNavigation { get; set; } = new List<Event>();


    }
}
