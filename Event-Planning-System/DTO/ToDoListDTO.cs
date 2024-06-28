using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace Event_Planning_System.DTO
{
	public class ToDoListDTO
	{
		[StringLength(50, MinimumLength = 3)]
		public string Title { get; set; }
		[Range(0, 10000000000)]
		public int? ToDoListBudget { get; set; }
		[MinLength(3)]
		public string Description { get; set; }
		[Required]
		public DateTime DeadLineTime { get; set; }
		[Required]
		public int EventId { get; set; }

		[DefaultValue(false)]
		public bool IsDone { get; set; }
	}
}
