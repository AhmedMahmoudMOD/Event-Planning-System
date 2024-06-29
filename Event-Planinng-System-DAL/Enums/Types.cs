using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Event_Planinng_System_DAL.Enums
{
    public enum RoleType
    {
        Planner,
        User,
    }
    public enum EventType
    {
        Wedding,
        Birthday,
        Corporate,
        Social,
        Other,
    }
    public enum EmailType
    {
        Invite,
        Reminder,
        ThankYou,
        Cancel,
        Other,
    }

    public enum RequestStatus
    {
        Pending,
        Accepted,
        Rejected
    }
}
