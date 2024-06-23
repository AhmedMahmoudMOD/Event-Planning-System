using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Event_Planinng_System_DAL.Models
{
    public class ToDoList
    {
        public DateTime DeadLineTime { get; set; }
        [StringLength(50, MinimumLength = 3)]
        public string Title { get; set; }
        [Range(0, 10000000000)]
        public int? ToDoListBudget { get; set; }
        [MinLength(3)]
        public string Description { get; set; }
        [ForeignKey("EventNavigation")]
        public int EventId { get; set; }    
        public virtual Event EventNavigation { get; set; }
    }
}
