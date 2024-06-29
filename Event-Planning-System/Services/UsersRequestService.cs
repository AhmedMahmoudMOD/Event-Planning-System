using AutoMapper;
using Event_Planinng_System_DAL.Enums;
using Event_Planinng_System_DAL.Models;
using Event_Planinng_System_DAL.Unit_Of_Work;
using Event_Planning_System.DTO.UserRequset;
using Event_Planning_System.IServices;
using MimeKit.Tnef;
using Org.BouncyCastle.Crypto;
using System.Collections.Generic;

namespace Event_Planning_System.Services
{
    public class UsersRequestService : IUserRequestService
    {
        private readonly IMapper mapper;
        private readonly UnitOfWork unitOfWork;
        public UsersRequestService(UnitOfWork _unit , IMapper _mapper)
        {
            this.unitOfWork = _unit;
            this.mapper = _mapper;
        }

        public async Task<UserRequestDTO?> CreateRequest(int userid , int eventid)
        {
            var userForThisEvent = (await unitOfWork.EventRepo.FindById(eventid)).CreatorId;

            if (userForThisEvent == userid)
            {
                return null;
            }

            var userEventCreated = new UserEventsRequests
            {
                UserId = userid,
                EventId = eventid,
                RequestStatus = Event_Planinng_System_DAL.Enums.RequestStatus.Pending
            };
            await unitOfWork.UserRequests.Add(userEventCreated);
            await unitOfWork.saveAsync();
            var usereventDTO = mapper.Map<UserRequestDTO>(userEventCreated);

            return usereventDTO;
        }



        public async Task<bool> DeleteRequset(int userid , int eventid)
        {
            var AllRequests = await unitOfWork.UserRequests.GetAll();
            var specificRequst = AllRequests.First(x=>x.UserId == userid && x.EventId == eventid);
            if (specificRequst != null && specificRequst.RequestStatus == RequestStatus.Pending)
            {
                await unitOfWork.UserRequests.Delete(specificRequst);
                await unitOfWork.saveAsync();
                return true;
            }
            return false;
        }


        public async Task<List<UserRequestDeatilsDTO>> GetAllUsersRequests(int eventid , RequestStatus status)
        {
            var AllUsersRequest = (await unitOfWork.UserRequests.GetAll())
                .Where(x=>x.EventId==eventid && x.RequestStatus == status)
                .Select(x=>x.UserNavigation);

            var model = mapper.Map<List<UserRequestDeatilsDTO>>(AllUsersRequest);
            foreach (var item in model)
            {
                item.RequestStatus = status;
            }

            return model;
        }

        public async Task<bool> ChangeStatus(UserRequestDTO userDTO)
        {
            var specificRequest = (await unitOfWork.UserRequests.GetAll())
                .First(x=>x.UserId== userDTO.UserId && x.EventId==userDTO.EventId);
            if (specificRequest == null)
                return false;
            specificRequest.RequestStatus = userDTO.RequestStatus ?? RequestStatus.Pending;
            await unitOfWork.UserRequests.Edit(specificRequest);
            await unitOfWork.saveAsync();

            return true;
        }
    }
}
