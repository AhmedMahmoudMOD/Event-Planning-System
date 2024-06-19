namespace Event_Planning_System.DTO.EventSchedule
{
    public class ScheduleEventData
    {
        public int Id { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public string? Subject { get; set; }
        public bool IsAllDay { get; set; }
        public string? StartTimezone { get; set; }
        public string? EndTimezone { get; set; }
        public string? RecurrenceRule { get; set; }
        public int? RecurrenceID { get; set; }
        public string? Loacation { get; set; }
        public string? Description { get; set; }
        public string? RecurrenceException { get; set; }
    }
}
