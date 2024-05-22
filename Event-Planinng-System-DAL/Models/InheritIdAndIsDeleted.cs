using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Event_Planinng_System_DAL.Models
{
    public class InheritIdAndIsDeleted
    {
        [Key]
        public int Id { get; set; }

        public bool IsDeleted { get; set; }
    }
}
