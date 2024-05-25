namespace Event_Planning_System.DTO.Mail
{
    public class SendEmailDto
    {
        public string recipientEmailAddress { get; set; }
        public string? recipientName { get; set; }
        public string? Subject { get; set; }
        public string? Body { get; set; }
        public string? SenderName { get; set; }
        public string? SenderEmail { get; set; }

    }
}
