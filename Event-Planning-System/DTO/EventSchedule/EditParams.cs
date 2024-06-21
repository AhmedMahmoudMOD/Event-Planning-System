namespace Event_Planning_System.DTO.EventSchedule
{
    public class EditParams
    {
        public string key { get; set; }
        public string action { get; set; }
        public List<ScheduleEventData> added { get; set; }
        public List<ScheduleEventData> changed { get; set; }
        public List<ScheduleEventData> deleted { get; set; }
        public ScheduleEventData value { get; set; }
    }
}
