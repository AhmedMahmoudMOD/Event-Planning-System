using Event_Planinng_System_DAL.Models;
using Event_Planinng_System_DAL.Repos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Event_Planinng_System_DAL.Unit_Of_Work
{
    public class UnitOfWork
    {
        GenericRepoForId<User> userRepository;
        GenericRepoForId<Attendance> attendanceRepository;
        GenericRepoForId<Event> eventRepo;
        GenericRepoForId<Role> roleRepo;

        GenericRepo<Comments> commentsRepo;
        GenericRepo<Emails> emailRepo;
        GenericRepo<EventImages> eventimagesRepo;
        GenericRepo<Invite> inviteRepo;
        GenericRepo<ToDoList> todolistRepo;
        GenericRepo<UserRole> userrroleRepo;

        private readonly dbContext db;
        public UnitOfWork(dbContext _db)
        {
            db = _db;
        }

        public GenericRepoForId<User> UserRepo
        {
            get => userRepository ??= new GenericRepoForId<User>(db);              
        }
        public GenericRepoForId<Attendance> AttendanceRepo
        {
            get => attendanceRepository ??= new GenericRepoForId<Attendance>(db);
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
        public GenericRepo<Invite> InviteRepo
        {
            get => inviteRepo ??= new GenericRepo<Invite>(db);
        }
        public GenericRepoForId<Role> RoleRepo
        {
            get => roleRepo ??= new GenericRepoForId<Role>(db);
        }
        public GenericRepo<ToDoList> ToDoListRepo
        {
            get => todolistRepo ??= new GenericRepo<ToDoList>(db);
        }
        public GenericRepo<UserRole> UserRoleRepo
        {
            get => userrroleRepo ??= new GenericRepo<UserRole>(db);
        }

        public void save()
        {
            db.SaveChanges();
        }
    }
}
