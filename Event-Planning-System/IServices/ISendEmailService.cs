using Event_Planning_System.DTO.Mail;

namespace Event_Planning_System.IServices
{
    public interface ISendEmailService
    {
        public EmailDetailsDto SendEmail( SendEmailDto sendmail);
    }
}
