using Event_Planning_System.DTO.EventSchedule;

namespace Event_Planning_System.IServices
{
    public interface IEventScheduleService
    {
        public  Task<List<ScheduleEventData>> GetAllSchedulePerEvent(int id);
        public Task<List<ScheduleEventData>> CrudServiceOnSchedule(int id, EditParams param);
        public Task<List<ScheduleEventData>> addnewschedule(int id, ScheduleEventData data);
        public Task<List<ScheduleEventData>> DeleteFromSchedule(int id, ScheduleEventData data);


    }
}
