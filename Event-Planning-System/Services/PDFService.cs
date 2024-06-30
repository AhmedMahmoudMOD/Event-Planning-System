using Event_Planinng_System_DAL.Unit_Of_Work;
using Event_Planning_System.IServices;
using Microsoft.AspNetCore.Mvc;
using Syncfusion.Pdf;
using static System.Runtime.InteropServices.JavaScript.JSType;
using Syncfusion.Pdf.Graphics;
using Syncfusion.Pdf.Grid;
using System.Security.Cryptography;
using Microsoft.VisualBasic;
using Microsoft.AspNetCore.Http.HttpResults;
using Syncfusion.Drawing;
using Event_Planinng_System_DAL.Models;
using Syncfusion.HtmlConverter;

namespace Event_Planning_System.Services
{
    public class PDFService : IPDFService
    {
        private readonly UnitOfWork unitOfWork;
        private readonly IEventService eventService;

        public PDFService(UnitOfWork unitOfWork,IEventService  eventService)
        {
            this.unitOfWork = unitOfWork;
            this.eventService = eventService;
        }




        public async Task<FileStreamResult> PrintPDF(int eventId)
        {
            Event myEvent = await unitOfWork.EventRepo.FindById(eventId);
            if (myEvent == null)
            {
                return null;
            }
			//<img src=\"../../Event-Planning-System-Angular/src/assets/images/Invite-bro.svg\" alt=\"Event Image\" style=\"width:50%; height: auto; border-radius: 10px;\" />
			var htmlstring = $"<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\r\n        <tr>\r\n            <td align=\"center\" style=\"padding: 10px 0 30px 0;\">\r\n                <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"600\">\r\n                    <tr>\r\n                        <td style=\"background-color: #c9fff1; padding: 40px 30px 40px 30px;\">\r\n                            <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\r\n                                <tr>\r\n                                    <td align=\"center\" style=\"padding: 0 0 20px 0;\">\r\n                                        \r\n                                    </td>\r\n                                </tr>\r\n                                <tr>\r\n                                    <td style=\"font-family: Arial, sans-serif; color: #333333;\">\r\n                             <h1 style=\"color: black;text-align:center;\">You're Invited!</h1>\r\n                                                              <p>We are excited to invite you to our upcoming event. Please find the details below:</p>\r\n                                        <p><strong>Event:</strong> {myEvent.Name}</p>\r\n                                        <p><strong>Date:</strong> {myEvent.EventDate.Date}</p>\r\n                                        <p><strong>Time:</strong> {myEvent.EventDate.TimeOfDay}</p>\r\n                                        <p><strong>Location:</strong> {myEvent.Location}, <a href=\"{myEvent.GoogleMapsLocation}\" style=\"color: #70bbd9;\">View on Google Maps</a></p>\r\n                                        <p>We hope you can join us for this special occasion.</p>\r\n                                        <p>Looking forward to seeing you there!</p>\r\n                                        <p>Best regards,</p>\r\n                                        <p>{myEvent.CreatorNavigation.FName} {myEvent.CreatorNavigation.LName}</p>\r\n                                        </td>\r\n                                </tr>\r\n                                <tr>\r\n                                    <td align=\"center\" style=\"padding: 20px 0 30px 0;\">\r\n                                        <p></p>\r\n                                    </td>\r\n                                </tr>\r\n                            </table>\r\n                        </td>\r\n                    </tr>\r\n                    <tr>\r\n                        <td style=\"background-color: rgb(23, 83, 42);padding: 30px 30px 30px 30px;\">\r\n                            <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\r\n                                <tr>\r\n                                    <td align=\"center\" style=\"color: white; font-family: Arial, sans-serif;\">\r\n                                        <p>&copy; 2024 Event Planning Company. All rights reserved.</p>\r\n                                    </td>\r\n                                </tr>\r\n                            </table>\r\n                        </td>\r\n                    </tr>\r\n                </table>\r\n            </td>\r\n        </tr>\r\n    </table>";
            //Initialize HTML to PDF converter.
            HtmlToPdfConverter htmlConverter = new HtmlToPdfConverter();
            BlinkConverterSettings blinkConverterSettings = new BlinkConverterSettings();
            //Set Blink viewport size.
            blinkConverterSettings.ViewPortSize = new Syncfusion.Drawing.Size(600, 0);
            //Assign Blink converter settings to HTML converter.
            htmlConverter.ConverterSettings = blinkConverterSettings;
            //Convert URL to PDF document.
            PdfDocument document = htmlConverter.Convert(htmlstring,string.Empty);
            //Create a filestream.
            MemoryStream memoryStream = new MemoryStream();
            // Save the PDF document to the stream.
            document.Save(memoryStream);
            document.Close(true);
            // Reset the position of the memory stream to the beginning.
            memoryStream.Position = 0;
            return new FileStreamResult(memoryStream, "application/pdf")
            {
                FileDownloadName = "EventInvitation.pdf"
            };
        }

    }
}
