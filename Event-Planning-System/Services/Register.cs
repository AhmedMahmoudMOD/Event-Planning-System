using AutoMapper;
using Event_Planinng_System_DAL.Models;
using Event_Planinng_System_DAL.Unit_Of_Work;
using Event_Planning_System.DTO;
using Event_Planning_System.DTO.Mail;
using Event_Planning_System.IServices;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;

namespace Event_Planning_System.Services

{
    public class Register : Iregestration
    {
        readonly UnitOfWork _unitOfWork;
        readonly IMapper mapper;
        readonly IBlobServices blobServices;
        readonly ISendEmailService sendEmailService;


        public Register(UnitOfWork _unitofwork, IMapper _mapper, UserManager<User> userManager, IBlobServices blobServices, ISendEmailService sendEmailService)
        {
            _unitOfWork = _unitofwork;
            mapper = _mapper;
            this.blobServices = blobServices;
            this.sendEmailService = sendEmailService;
        }
        public async Task<IdentityResult> adduser(UserDto userDto)
        {
            // Map UserDto to User
           

            var user = mapper.Map<User>(userDto);

            

            var url = await blobServices.AddingImage(userDto.Image);

            user.Image = url;

            await Console.Out.WriteLineAsync(url);


            // Create user with UserManager and set the password
            var result = await _unitOfWork.UserRepo.Add(user, userDto.Password);

            if (result.Succeeded)
            {
              var emailurl =   await _unitOfWork.UserRepo.GenerteEmailConfirmEmail(user);

                var email = new SendEmailDto
                {
                    Sender = new EmailAdressDto { Email = "Edo0@outlook.com", Name = "EPP"},
                    Recipient = new EmailAdressDto { Email = user.Email, Name = user.FName },
                    Subject = "Email Confirmation",
                    Body = $"Please confirm your email by clicking on the link below <br> <a href='{emailurl}'>Click here</a>"
                };


               var emailresult =  sendEmailService.SendEmail(email);

            }

            return result;
        }
    }
}
