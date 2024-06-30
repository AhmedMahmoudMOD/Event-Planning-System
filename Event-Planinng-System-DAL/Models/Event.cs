using Event_Planinng_System_DAL.Enums;
using Event_Planinng_System_DAL.Model_Validations;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Event_Planinng_System_DAL.Models
{
    public class Event : InheritIdAndIsDeleted
    {

        [ForeignKey("CreatorNavigation")]
        public int CreatorId { get; set; }
        [StringLength(50, MinimumLength =3)]
        public string Name { get; set; }
        [MinLength(3)]
        public string? Description { get; set; }
        [StringLength(500, MinimumLength =3)]
        public string Location { get; set; }
        [Range(0, int.MaxValue)]
        public int? AttendanceNumber { get; set; }
        [StringLength(5000, MinimumLength =3)] 
        public string? GoogleMapsLocation { get; set; }
        [Range(0, int.MaxValue)]
        public int? Budget { get; set; }
        public EventType EventType { get; set; }
        [FutureDate]
        public DateTime EventDate { get; set; }
        [FutureDate]
        public DateTime EndDate { get; set; }
        public DateOnly DateOfCreation { get; set;}

        public virtual User CreatorNavigation { get; set; }
        public virtual List<Comments> CommentsNavigation { get; set; } = new List<Comments>();
        public virtual List<ToDoList> ToDoListsNavigation { get; set; } = new List<ToDoList>();   
        public virtual List<Emails> EventEmailsNavigation { get; set; } = new List<Emails>();
        public virtual List<EventImages> EventImagesNavigation { get; set; } = new List<EventImages>();
        public virtual List<Attendance> AttendanceNavigation { get; set; } = new List<Attendance>(); 
        public virtual List<EventSchedule> EventScheduleNavigation { get; set; } = new List<EventSchedule> ();
        public virtual List<UserEventsRequests> UserEventRequestsNavigation { get; set; } = new List<UserEventsRequests>();

    }
}
