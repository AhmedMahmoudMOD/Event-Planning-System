namespace Event_Planning_System.DTO.Mail
{
    public class MailInfoDto
    {
        public string MailServer { get; set; }
        public int MailPort { get; set; }
        public string AuthEmail { get; set; }
        public string AuthPassword { get; set; }
        public string SenderName { get; set; }
        public string SenderEmail { get; set; }
    }
}
