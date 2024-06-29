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
            var htmlstring = $"<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\r\n        <tr>\r\n            <td align=\"center\" style=\"padding: 10px 0 30px 0;\">\r\n                <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"600\">\r\n                    <tr>\r\n                        <td align=\"center\" bgcolor=\"#70bbd9\" style=\"padding: 40px 0 30px 0;\">\r\n                            <h1 style=\"color: white;\">You're Invited!</h1>\r\n                        </td>\r\n                    </tr>\r\n                    <tr>\r\n                        <td bgcolor=\"#ffffff\" style=\"padding: 40px 30px 40px 30px;\">\r\n                            <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\r\n                                <tr>\r\n                                    <td>\r\n <p>We are excited to invite you to our upcoming event. Please find the details below:</p>\r\n                                        <p><strong>Event:</strong> {myEvent.Name}</p>\r\n                                        <p><strong>Date:</strong> {myEvent.EventDate.Date}</p>\r\n                                        <p><strong>Time:</strong> {myEvent.EventDate.TimeOfDay}</p>\r\n                                        <p><strong>Location:</strong> {myEvent.Location}, {myEvent.GoogleMapsLocation}</p>\r\n                                        <p>We hope you can join us for this special occasion.</p>\r\n                                        <p>Looking forward to seeing you there!</p>\r\n                                        <p>Best regards,</p>\r\n                                        <p>{myEvent.CreatorNavigation.FName} {myEvent.CreatorNavigation.LName}</p>\r\n                                        <p></p>\r\n                                    </td>\r\n                                </tr>\r\n                                <tr>\r\n                                    <td align=\"center\" style=\"padding: 20px 0 30px 0;\">\r\n                                        <p></p>\r\n                                    </td>\r\n                                </tr>\r\n                            </table>\r\n                        </td>\r\n                    </tr>\r\n                    <tr>\r\n                        <td bgcolor=\"#70bbd9\" style=\"padding: 30px 30px 30px 30px;\">\r\n                            <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\r\n                                <tr>\r\n                                    <td align=\"center\" style=\"color: white;\">\r\n                                        <p>&copy; 2024 Event Planning Company. All rights reserved.</p>\r\n                                    </td>\r\n                                </tr>\r\n                            </table>\r\n                        </td>\r\n                    </tr>\r\n                </table>\r\n            </td>\r\n        </tr>\r\n    </table>";
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
