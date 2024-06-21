using Event_Planinng_System_DAL.Models;
using Event_Planinng_System_DAL.Repos;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Event_Planinng_System_DAL.Unit_Of_Work
{
    public class UnitOfWork
    {
        UserRepo userRepository;
        GenericRepoForId<Event> eventRepo;
        //GenericRepoForId<Role> roleRepo;

        GenericRepo<Attendance> attendanceRepository;
        GenericRepo<Comments> commentsRepo;
        GenericRepo<Emails> emailRepo;
        GenericRepo<EventImages> eventimagesRepo;
        GenericRepo<ToDoList> todolistRepo;
        GenericRepo<UserRole> userrroleRepo;
        GenericRepo<EventSchedule> eventschedulerepo;

        private readonly dbContext db;
        private readonly UserManager<User> userManager;
        public UnitOfWork(dbContext _db , UserManager<User> _user)
        {
            db = _db;
            userManager = _user;
        }

        public UserRepo UserRepo
        {
            get => userRepository ??= new UserRepo(userManager, db);
        }
        public GenericRepo<Attendance> AttendanceRepo
        {
            get => attendanceRepository ??= new GenericRepo<Attendance>(db);
        }
        public GenericRepo<Comments> CommentsRepo
        {
            get => commentsRepo ??= new GenericRepo<Comments>(db);
        }
        public GenericRepo<Emails> EmailsRepo
        {
            get => emailRepo ??= new GenericRepo<Emails>(db);
        }
        public GenericRepoForId<Event> EventRepo
        {
            get => eventRepo ??= new GenericRepoForId<Event>(db);
        }
        public GenericRepo<EventImages> EventImagesRepo
        {
            get => eventimagesRepo ??= new GenericRepo<EventImages>(db);
        }

        //public GenericRepoForId<Role> RoleRepo
        //{
        //    get => roleRepo ??= new GenericRepoForId<Role>(db);
        //}
        public GenericRepo<ToDoList> ToDoListRepo
        {
            get => todolistRepo ??= new GenericRepo<ToDoList>(db);
        }
        public GenericRepo<UserRole> UserRoleRepo
        {
            get => userrroleRepo ??= new GenericRepo<UserRole>(db);
        }

        public GenericRepo<EventSchedule> EventScheduleRepo
        {
            get => eventschedulerepo ??= new GenericRepo<EventSchedule> (db);
        }

        public void save()
        {
            db.SaveChangesAsync();
        }
        public async Task saveAsync()
		{
			await db.SaveChangesAsync();
		}
	}
}
