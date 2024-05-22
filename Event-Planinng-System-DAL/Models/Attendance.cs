﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Event_Planinng_System_DAL.Models
{
    public class Attendance : InheritIdAndIsDeleted
    {
        [EmailAddress(ErrorMessage = "invalid email message")]
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }
        public virtual List<Invite> EventInviteNavigation { get; set; } = new List<Invite>();
    }
}