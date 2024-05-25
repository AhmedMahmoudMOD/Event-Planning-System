using AutoMapper;
using Event_Planinng_System_DAL.Models;
using Event_Planinng_System_DAL.Unit_Of_Work;
using Event_Planning_System.DTO;
using Event_Planning_System.IServices;
using Microsoft.AspNetCore.Identity;

namespace Event_Planning_System.Services
{
    public class Profile : IProfileService
    {
        public readonly UnitOfWork unitOfWork;
        public readonly IMapper mapper;
        public Profile(UnitOfWork unitOfWork, IMapper mapper)
        {
            this.unitOfWork = unitOfWork;
            this.mapper = mapper;
        }

        // Get profile by Id
        public async Task<ProfileDTO> GetProfileById(int id)
        {
            User user = await unitOfWork.UserRepo.FindById(id);
            if (user == null || user.IsDeleted)
            {
                return null;
            }
            else
            {
                ProfileDTO profileDTO = new ProfileDTO
                {
                    FName = user.FName,
                    LName = user.LName,
                    Email = user.Email,
                    PhoneNumber = user.PhoneNumber,
                    Street = user.Street,
                    City = user.City,
                    Region = user.Region,
                    PostalCode = user.PostalCode,
                    DateOfBirth = user.DateOfBirth,
                    Image = user.Image
                };
                return profileDTO;
            }
        }

        // Get profile by email
        public async Task<ProfileDTO> GetProfileByEmail(string email)
        {
            User user = await unitOfWork.UserRepo.FindByEmail(email);
            if (email == null || user.IsDeleted)
            {
                return null;
            }
            else 
            {                 
                ProfileDTO profileDTO = new ProfileDTO
                {
                    FName = user.FName,
                    LName = user.LName,
                    Email = user.Email,
                    PhoneNumber = user.PhoneNumber,
                    Street = user.Street,
                    City = user.City,
                    Region = user.Region,
                    PostalCode = user.PostalCode,
                    DateOfBirth = user.DateOfBirth,
                    Image = user.Image
                };
                return profileDTO;
            }
        }

        // Edit profile
        public async Task<ProfileDTO> EditProfile(int id, ProfileDTO profileDTO)
        {
            if (profileDTO == null)
            {
                throw new ArgumentNullException(nameof(profileDTO), "Profile data cannot be null.");
            }

            User user = await unitOfWork.UserRepo.FindById(id);
            if (user == null)
            {
                return null; 
            }
            user.FName = profileDTO.FName;
            user.LName = profileDTO.LName;
            user.Email = profileDTO.Email;
            user.PhoneNumber = profileDTO.PhoneNumber;
            user.Street = profileDTO.Street;
            user.City = profileDTO.City;
            user.Region = profileDTO.Region;
            user.PostalCode = profileDTO.PostalCode;
            user.DateOfBirth = profileDTO.DateOfBirth;

            // Use the Edit method to update the user
            await unitOfWork.UserRepo.Edit(user);

            // Return the updated profile as ProfileDTO
            return new ProfileDTO
            {
                FName = user.FName,
                LName = user.LName,
                Email = user.Email,
                PhoneNumber = user.PhoneNumber,
                Street = user.Street,
                City = user.City,
                Region = user.Region,
                PostalCode = user.PostalCode,
                DateOfBirth = user.DateOfBirth
            };
        }

        // Delete profile
        public async Task<ProfileDTO> DeleteProfile(int id)
        {
            var user = await unitOfWork.UserRepo.FindById(id);
            if (user == null)
            {
                return null;
            }

            // Soft delete the user by setting IsDeleted to true
            await unitOfWork.UserRepo.Delete(user);

            // Construct the ProfileDTO from the deleted user's information
            var profileDTO = new ProfileDTO
            {
                FName = user.FName,
                LName = user.LName,
                Email = user.Email,
                PhoneNumber = user.PhoneNumber,
                Street = user.Street,
                City = user.City,
                Region = user.Region,
                PostalCode = user.PostalCode,
                DateOfBirth = user.DateOfBirth
            };

            return profileDTO;
        }



    }
}
