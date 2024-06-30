using Event_Planinng_System_DAL.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Reflection.Metadata.Ecma335;
using System.Text;
using System.Threading.Tasks;

namespace Event_Planinng_System_DAL.Models
{
    public class UserEventsRequests
    {
        [ForeignKey("UserNavigation")]
        public int UserId { get; set; }
        [ForeignKey("EventNavigation")]
        public int EventId { get; set; }
        public RequestStatus RequestStatus { get; set; }
        public virtual User UserNavigation { get; set; }
        public virtual Event EventNavigation { get; set; }

    }
}
