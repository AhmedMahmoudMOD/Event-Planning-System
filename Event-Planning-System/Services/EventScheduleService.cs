using AutoMapper;
using Event_Planinng_System_DAL.Models;
using Event_Planinng_System_DAL.Unit_Of_Work;
using Event_Planning_System.DTO.EventSchedule;
using Event_Planning_System.IServices;
using Event_Planning_System.Migrations;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel;

namespace Event_Planning_System.Services
{
    public class EventScheduleService : IEventScheduleService
    {
        private readonly UnitOfWork unitOfWork;
        private readonly IMapper Mapper;
        public EventScheduleService(UnitOfWork _unit , IMapper _maper)
        {
            unitOfWork = _unit;
            Mapper = _maper;
        }

        public async Task<List<ScheduleEventData>> GetAllSchedulePerEvent (int id)
        {
            var AllSchedules = await unitOfWork.EventScheduleRepo.GetAll();
            var AllSchedulesPerEvent = AllSchedules.Where(e => e.EventId == id).ToList();

            var model = Mapper.Map<List<ScheduleEventData>>(AllSchedulesPerEvent);
            return model;
        }

        public async Task<List<ScheduleEventData>> CrudServiceOnSchedule(int id ,EditParams param)
        {
            var AllSchedules = await unitOfWork.EventScheduleRepo.GetAll();
            var AllSchedulesPerEvent = AllSchedules.Where(x => x.EventId == id).ToList();

            if (param.action == "insert" || (param.action == "batch" && param.added != null))
            {
                var value = (param.action == "insert") ? param.value : param.added[0];
                 

                int intMax = AllSchedulesPerEvent.Count > 0 ? AllSchedulesPerEvent.Max(x=>x.Id) : 1;
                DateTime startTime = Convert.ToDateTime(value.StartTime);
                DateTime endTime = Convert.ToDateTime(value.EndTime);

                ScheduleEventData appointment = new ScheduleEventData()
                {
                    Id = intMax + 1,
                    StartTime = startTime.ToLocalTime(),
                    EndTime = endTime.ToLocalTime(),
                    Subject = value.Subject,
                    IsAllDay = value.IsAllDay,
                    StartTimezone = value.StartTimezone,
                    EndTimezone = value.EndTimezone,
                    RecurrenceRule = value.RecurrenceRule,
                    RecurrenceID = value.RecurrenceID,
                    RecurrenceException = value.RecurrenceException
                };

                var addeventschedule = Mapper.Map<EventSchedule>(appointment);
                addeventschedule.EventId = id;
                await unitOfWork.EventScheduleRepo.Add(addeventschedule);
            }

            if (param.action == "update" || (param.action == "batch" && param.changed != null))
            {
                var value = (param.action == "update") ? param.value : param.changed[0];
                

                var filterData = AllSchedulesPerEvent.Where(c => c.Id == Convert.ToInt32(value.Id));
                if (filterData.Count() > 0)
                {
                    DateTime startTime = Convert.ToDateTime(value.StartTime);
                    DateTime endTime = Convert.ToDateTime(value.EndTime);
                    var appointment = AllSchedulesPerEvent.Single(A => A.Id == Convert.ToInt32(value.Id));
                    appointment.StartTime = startTime.ToLocalTime();
                    appointment.EndTime = endTime.ToLocalTime();
                    appointment.StartTimezone = value.StartTimezone;
                    appointment.EndTimezone = value.EndTimezone;
                    appointment.Subject = value.Subject;
                    appointment.IsAllDay = value.IsAllDay;
                    appointment.RecurrenceRule = value.RecurrenceRule;
                    appointment.RecurrenceID = value.RecurrenceID;
                    appointment.RecurrenceException = value.RecurrenceException;
                    appointment.EventId = id;
                    await unitOfWork.EventScheduleRepo.Edit(appointment);
                }
                await unitOfWork.saveAsync();
            }

            if (param.action == "remove" || (param.action == "batch" && param.deleted != null))
            {
                if (param.action == "remove")
                {
                    int key = Convert.ToInt32(param.key);
                    var deletedItem = AllSchedulesPerEvent.Where(x=>x.Id == key).FirstOrDefault();
                    if (deletedItem != null)                   
                        await unitOfWork.EventScheduleRepo.Delete(deletedItem);
                    
                }
                else
                {
                    foreach (var apps in param.deleted)
                    {
                        var deletedItem = AllSchedulesPerEvent.Where(x => x.Id == apps.Id).FirstOrDefault();
                        if (deletedItem != null)
                            await unitOfWork.EventScheduleRepo.Delete(deletedItem);
                    }
                }
                await unitOfWork.saveAsync();
            }

            var data = await GetAllSchedulePerEvent(id);

            return data;
        }


        public async Task<List<ScheduleEventData>> addnewschedule(int id , ScheduleEventData data)
        {
            var AllSchedules = await unitOfWork.EventScheduleRepo.GetAll();
            var AllSchedulesPerEvent = AllSchedules.Where(x => x.EventId == id).ToList();

            int intMax = AllSchedulesPerEvent.Count > 0 ? AllSchedulesPerEvent.Max(x => x.Id) : 1;
            DateTime startTime = Convert.ToDateTime(data.StartTime);
            DateTime endTime = Convert.ToDateTime(data.EndTime);

            ScheduleEventData appointment = new ScheduleEventData()
            {
                Id = intMax + 1,
                StartTime = startTime.ToLocalTime(),
                EndTime = endTime.ToLocalTime(),
                Subject = data.Subject,
                IsAllDay = data.IsAllDay,
                StartTimezone = data.StartTimezone,
                EndTimezone = data.EndTimezone,
                RecurrenceRule = data.RecurrenceRule,
                RecurrenceID = data.RecurrenceID,
                RecurrenceException = data.RecurrenceException
            };

            var addeventschedule = Mapper.Map<EventSchedule>(appointment);
            addeventschedule.EventId = id;
            await unitOfWork.EventScheduleRepo.Add(addeventschedule);

            var model = await GetAllSchedulePerEvent(id);
            return model;
        }
         
        public async Task<List<ScheduleEventData>> DeleteFromSchedule(int id , ScheduleEventData data)
        {
            var AllSchedules = await unitOfWork.EventScheduleRepo.GetAll();
            var AllSchedulesPerEvent = AllSchedules.Where(x => x.EventId == id).ToList();

            int key = Convert.ToInt32(data.Id);
            var deletedItem = AllSchedulesPerEvent.Where(x => x.Id == key).FirstOrDefault();
            if (deletedItem != null)
                await unitOfWork.EventScheduleRepo.Delete(deletedItem);

            var model = await GetAllSchedulePerEvent(id);
            return model;

        }
    }
}
