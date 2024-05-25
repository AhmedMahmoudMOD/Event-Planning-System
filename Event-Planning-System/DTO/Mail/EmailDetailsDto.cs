using System.Net.Mail;

namespace Event_Planning_System.DTO.Mail
{
    public class EmailDetailsDto
    {
        public bool IsSend { get; set; }
        public EmailAdressDto From { get; set; }
        public EmailAdressDto To { get; set; }
        public string Subject { get; set; } = "";
        public string Body { get; set; } = "";
        public DateTime Timestamp { get; set; } = DateTime.Now;
    }
}
