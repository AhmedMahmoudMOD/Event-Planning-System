using AutoMapper;
using Event_Planinng_System_DAL.Models;
using Event_Planinng_System_DAL.Unit_Of_Work;
using Event_Planning_System.DTO;
using Event_Planning_System.IServices;

namespace Event_Planning_System.Services

{
    public class Register : Iregestration
    {
        readonly UnitOfWork unitOfWork;
        readonly IMapper mapper;
        public Register(UnitOfWork _unitofwork, IMapper _mapper)
        {
            unitOfWork = _unitofwork;
            mapper = _mapper;
            
        }
        async Task Iregestration.AddUserAsync(UserDto userDto, string password)
        {
            var user = mapper.Map<User>(userDto);
            await unitOfWork.UserRepo.Add(user, password);
            unitOfWork.save();
        }
    }
}
