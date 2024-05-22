using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Event_Planinng_System_DAL.Model_Validations
{
    internal class PastDateAttribute  : ValidationAttribute
    {
        public PastDateAttribute()
        {
            ErrorMessage = "The date must be in the Past.";
        }
        public override bool IsValid(object value)
        {
            if (value == null)
            {
                return true; // Assuming that null values are handled elsewhere, like with [Required]
            }

            if (value is DateOnly dateOnly)
            {
                return dateOnly < DateOnly.FromDateTime(DateTime.Now);
            }

            return false;
        }
    }
}
