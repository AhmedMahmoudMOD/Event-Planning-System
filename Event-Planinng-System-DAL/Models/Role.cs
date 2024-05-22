using Event_Planinng_System_DAL.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Event_Planinng_System_DAL.Models
{
    public class Role : InheritIdAndIsDeleted
    {

        [StringLength(50, MinimumLength =3)]
        public RoleType Name { get; set; }
        public bool IsDeleted { get; set; }
        public virtual List<UserRole> UserRoles { get; set; } = new List<UserRole>();
    }

}
