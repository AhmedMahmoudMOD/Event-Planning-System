using Castle.Components.DictionaryAdapter.Xml;
using Event_Planning_System.DTO.Mail;
using Event_Planning_System.IServices;
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Options;
using MimeKit;
using System.Linq.Expressions;

namespace Event_Planning_System.Services
{
    public class SendEmailService :  ISendEmailService
    {
        MailInfoDto mailInfo;
        public SendEmailService(IOptions<MailInfoDto> _mailInfo)
        {
            mailInfo = _mailInfo.Value;
        }
        public EmailDetailsDto SendEmail( SendEmailDto sendmail)
        {
            try{
                var message = new MimeMessage();
                message.From.Add(new MailboxAddress(sendmail.SenderName ?? mailInfo.SenderName
                    , sendmail.SenderEmail ?? mailInfo.SenderEmail));

                message.To.Add(new MailboxAddress(sendmail.recipientName, sendmail.recipientEmailAddress));
                message.Subject = sendmail.Subject;
                message.Body = new TextPart("plain") { Text = sendmail.Body };

                using (var client = new SmtpClient())
                {
                    client.Connect(mailInfo.MailServer, mailInfo.MailPort, SecureSocketOptions.StartTls);
                    client.Authenticate(mailInfo.AuthEmail, mailInfo.AuthPassword);
                    client.Send(message);
                    client.Disconnect(true);
                }


                var EmailDetails = new EmailDetailsDto
                {
                    IsSend = true,
                    From = new EmailAdressDto
                    {
                        Name = sendmail.SenderName ?? "Invitation To Event",
                        Email = sendmail.SenderEmail ?? "abdellatiefhamed00@gmail.com"
                    },
                    To = new EmailAdressDto
                    {
                        Name = sendmail.recipientName ?? "",
                        Email = sendmail.recipientEmailAddress
                    },
                    Subject = sendmail.Subject,
                    Body = sendmail.Body,
                };
                return EmailDetails;
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }
    }
}
