using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Event_Planinng_System_DAL.Models
{
    public class UserRole
    {
        [ForeignKey("UserNavigation")]
        public int UserId { get; set; }
        [ForeignKey("RoleNavigation")]
        public int RoleId { get; set; }
        public virtual User UserNavigation { get; set; }
        public virtual Role RoleNavigation { get; set; }
    }
}
