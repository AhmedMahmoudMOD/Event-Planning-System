using Microsoft.AspNetCore.Mvc;

namespace Event_Planning_System.IServices
{
     public interface IPDFService
    {

        Task<FileStreamResult> PrintPDF(int eventId);
    }
}
