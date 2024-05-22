using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Event_Planinng_System_DAL.Models
{
    public class EventImages
    {
        [ForeignKey("EventNavigation")]
        public int EventId { get; set; }
        public string EventImage { get; set; }
        public virtual Event EventNavigation { get; set; }
    }
}
