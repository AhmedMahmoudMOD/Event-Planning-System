using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Event_Planinng_System_DAL.Models
{
    public class Comments
    {
        [ForeignKey("UserNavigation")]
        public int UserId { get; set; }
        [ForeignKey("EventNavigation")]
        public int EventId { get; set; }
        [MinLength(3), MaxLength(50)]
        public string? Title { get; set; }
        [MinLength(1)]
        public string Body { get; set; }
        public DateTime? CommentDate { get; set; }
        public virtual User UserNavigation { get; set; }
        public virtual Event EventNavigation { get; set; }
    }
}
