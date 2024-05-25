namespace Event_Planning_System.DTO.Mail
{
    public class SendEmailDto
    {
        public EmailAdressDto Recipient {  get; set; }
        public EmailAdressDto Sender { get; set; }
        public string? Subject { get; set; }
        public string? Body { get; set; }
    }
}
