using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Event_Planinng_System_DAL.Models
{
    public class Invite
    {
        [ForeignKey("EventNavigation")]
        public int EventId { get; set; }
        [ForeignKey("AttendaceNavigation")]
        public int AttendantId { get; set; }
        public bool IsSent { get; set; }
        public virtual Event EventNavigation { get; set; }
        public virtual Attendance AttendaceNavigation { get; set; }
    }
}
