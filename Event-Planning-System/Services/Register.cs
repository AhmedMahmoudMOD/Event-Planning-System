using AutoMapper;
using Event_Planinng_System_DAL.Models;
using Event_Planinng_System_DAL.Unit_Of_Work;
using Event_Planning_System.DTO;
using Event_Planning_System.IServices;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;

namespace Event_Planning_System.Services

{
    public class Register : Iregestration
    {
        readonly UnitOfWork _unitOfWork;
        readonly IMapper mapper;
        private readonly UserManager<User> _userManager;
        

        public Register(UnitOfWork _unitofwork, IMapper _mapper, UserManager<User> userManager)
        {
            _unitOfWork = _unitofwork;
            mapper = _mapper;
            _userManager = userManager;
            
        }
        public async Task<IdentityResult> adduser(UserDto userDto)
        {
            // Map UserDto to User
            
            var user = mapper.Map<User>(userDto);
            user.UserName = userDto.Email;

            // Create user with UserManager and set the password
             var result =  await _unitOfWork.UserRepo.Add(user,userDto.Password) ;
            await _unitOfWork.UserRepo.AddUserToRoles(user);
            return result;
        }
    }
}
