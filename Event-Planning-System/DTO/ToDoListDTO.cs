namespace Event_Planning_System.DTO
{
	public class ToDoListDTO
	{
		public string Title { get; set; }
		public int? ToDoListBudget { get; set; }
		public string Description { get; set; }
		public DateOnly DeadLineTime { get; set; }
		public int EventId { get; set; }
	}
}
