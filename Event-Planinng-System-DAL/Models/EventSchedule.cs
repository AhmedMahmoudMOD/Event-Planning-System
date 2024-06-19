using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Event_Planinng_System_DAL.Models
{
    public class EventSchedule
    {
        [ForeignKey("EventNavigation")]
        public int EventId { get; set; }
        public int Id { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public string? Subject { get; set; }
        public bool IsAllDay { get; set; }
        public string? StartTimezone { get; set; }
        public string? EndTimezone { get; set; }
        public string? RecurrenceRule { get; set; }
        public int? RecurrenceID { get; set; }
        public string? RecurrenceException { get; set; }
        public virtual Event EventNavigation { get; set; }
    }
}
