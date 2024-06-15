﻿using Event_Planinng_System_DAL.Enums;
using Event_Planinng_System_DAL.Models;
using Event_Planinng_System_DAL.Model_Validations;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Event_Planning_System.DTO
{
	public class EventDTO
	{
        public int? Id { get; set; }

        [StringLength(50, MinimumLength = 3)]
		public string Name { get; set; }
		[MinLength(3)]
		public string? Description { get; set; }
		[StringLength(500, MinimumLength = 3)]
		public string Location { get; set; }
		[Range(0, int.MaxValue)]
		public int? AttendanceNumber { get; set; }
		[StringLength(5000, MinimumLength = 3)]
		public string? GoogleMapsLocation { get; set; }
		[Range(0, int.MaxValue)]
		public int? Budget { get; set; }
		public EventType EventType { get; set; }
		public string EventDate { get; set; }
        public string EndDate { get; set; }

        public List<AttendanceDTO>? Emails { get; set; }
		public List<string>? EventImages { get; set; }

    }
}
