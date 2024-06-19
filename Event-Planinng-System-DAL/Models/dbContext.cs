using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Event_Planinng_System_DAL.Models
{
    public class dbContext : IdentityDbContext<User , Role ,int>
    {
        public dbContext()
        {
        }
        public dbContext(DbContextOptions<dbContext> options) : base(options) { }

        public virtual DbSet<Attendance> Attendances { get; set; }
        public virtual DbSet<Comments> Comments { get; set; }
        public virtual DbSet<Emails> Emails { get; set; }
        public virtual DbSet<Event> Events { get; set; }
        public virtual DbSet<EventImages> EventsImages { get; set; }
        public virtual DbSet<EventSchedule> EventSchedules { get; set; }
        public virtual DbSet<ToDoList> ToDoLists { get; set; }

        //protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        //{
        //    base.OnConfiguring(optionsBuilder);
        //}

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //user
            modelBuilder.Entity<User>(entity =>
            {
                entity.HasIndex(e=>e.Email).IsUnique();
            });

            //Attendance 
            modelBuilder.Entity<Attendance>(entity =>
            {
                entity.HasKey(e=>new {e.Email , e.EventId});
            });
            //comments
            modelBuilder.Entity<Comments>(entity =>
            {
                entity.HasKey(e => new { e.UserId, e.EventId });
                entity.HasOne(e=>e.UserNavigation)
                .WithMany(s => s.CommentsNavigation)
                .HasForeignKey(e => e.UserId)
                .OnDelete(DeleteBehavior.NoAction); 
            });

            //Emails
            modelBuilder.Entity<Emails>(entity =>
            {
                entity.HasKey(e => new { e.Type, e.EventId });
                entity.Property(e => e.Type).HasConversion<string>();
            });

            //events
            modelBuilder.Entity<Event>(entity =>
            {
                entity.Property(e => e.EventType).HasConversion<string>();
            });

            //event images
            modelBuilder.Entity<EventImages>(entity =>
            {
                entity.HasKey(e => new { e.EventImage, e.EventId });
            });

            //event schedule
            modelBuilder.Entity<EventSchedule>(entity =>
            {
                entity.HasKey(e => new { e.EventId, e.Id });
            });

            //to do list
            modelBuilder.Entity<ToDoList>(entity =>
            {
                entity.HasKey(e => new { e.Title, e.EventId });                
            });

            


            base.OnModelCreating(modelBuilder); 
        }

    }
}
