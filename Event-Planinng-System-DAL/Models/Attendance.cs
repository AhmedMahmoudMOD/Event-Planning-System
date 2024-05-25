using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Event_Planinng_System_DAL.Models
{
    public class Attendance 
    {
        [ForeignKey("EventNavigation")]
        public int EventId {  get; set; }
        [EmailAddress(ErrorMessage = "invalid email message")]
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }

        public bool IsSent { get; set; }


        public virtual Event EventNavigation { get; set; }
    }
}
