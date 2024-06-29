<<<<<<< Updated upstream
<<<<<<< Updated upstream
﻿using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
=======
﻿using System.ComponentModel.DataAnnotations;
>>>>>>> Stashed changes
=======
﻿using System.ComponentModel.DataAnnotations;
>>>>>>> Stashed changes

namespace Event_Planning_System.DTO
{
	public class ToDoListDTO
	{
		[StringLength(50, MinimumLength = 3)]
		public string Title { get; set; }
<<<<<<< Updated upstream
<<<<<<< Updated upstream
		[Range(0, 10000000000)]
		public int? ToDoListBudget { get; set; }
		[MinLength(3)]
		public string Description { get; set; }
		[Required]
		public DateTime DeadLineTime { get; set; }
		[Required]



		[Range(0, 10000000000)]
		public int? ToDoListBudget { get; set; }

		[MinLength(3)]
		public string Description { get; set; }

		public DateOnly DeadLineTime { get; set; }

>>>>>>> Stashed changes
		public int EventId { get; set; }

		[DefaultValue(false)]
		public bool IsDone { get; set; }
	}
}
