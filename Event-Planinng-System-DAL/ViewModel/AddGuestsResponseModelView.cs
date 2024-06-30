using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Event_Planinng_System_DAL.ViewModel
{
	public class AddGuestsResponseModelView
	{
		public bool Success { get; set; }
		public string Message { get; set; }
		public List<string> SuccessfulEmails { get; set; } = new List<string>();
		public List<string> InvalidEmails { get; set; } = new List<string>();
		public List<string> DuplicateEmails { get; set; } = new List<string>();
	}
}
