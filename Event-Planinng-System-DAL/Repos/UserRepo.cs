using Event_Planinng_System_DAL.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure.Internal;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Reflection.Metadata.Ecma335;
using System.Text;
using System.Threading.Tasks;

namespace Event_Planinng_System_DAL.Repos
{
    public class UserRepo
    {
        readonly UserManager<User> UserManager;
        readonly dbContext db;
        public UserRepo(UserManager<User> _user, dbContext db)
        {
            UserManager = _user;
            this.db = db;

        }

        public async Task<List<User>> GetAll()
        {
            return await db.Users.ToListAsync();
        }

        public IQueryable<User> GetAllQuery()
        {
            return db.Users;
        }

        public async Task Edit(User model)
        {
            if (model == null)
            {
                throw new ArgumentNullException("model");
            }
            db.Entry(model).State = EntityState.Modified;
            await db.SaveChangesAsync();
        }


        public async Task<IdentityResult> Add (User model , string password)
        {
            if (model == null)
            {   
                throw new ArgumentNullException("model");
            }
         
            var crresult =await UserManager.CreateAsync(model , password);

            IdentityResult addresult = new IdentityResult();
            if (crresult.Succeeded)
            {
                addresult =  await AddUserToRoles(model);
            }
            return addresult;
        }

        public async Task<User?> FindById (int id)
        {
            return await UserManager.FindByIdAsync(id.ToString());
        }

        public async Task Delete(User model)
        {
            model.IsDeleted = true;
            await db.SaveChangesAsync();
        }

        public async Task<User?> FindByEmail(string email)
        {
            return await UserManager.FindByEmailAsync(email);
        }

        public async Task<List<string>?> GetAllRoles(User model)
        {
            return await UserManager.GetRolesAsync(model) as List<string>;
        }

        public async Task<IdentityResult> AddUserToRoles(User model)
        {
           return await UserManager.AddToRolesAsync(model, new List<string> { "Planner" , "User" });
        }

        public async Task<string> GenerteEmailConfirmEmail(User model)
        {
           if (model != null)
            {
                var emailtoken = await UserManager.GenerateEmailConfirmationTokenAsync(model);
                var encoddemailtoken = Encoding.UTF8.GetBytes(emailtoken);
                var validemailtoken = WebEncoders.Base64UrlEncode(encoddemailtoken);

                var url = $"http://localhost:4200/auth/validateemail?email={model.Email}&token={validemailtoken}";

                return url;

            }

            return null;
        }

        public async Task<IdentityResult> ValidateEmailToken(User user,string token)
        {
            var validEncodedToken = Encoding.UTF8.GetString(WebEncoders.Base64UrlDecode(token));

            var result = await UserManager.ConfirmEmailAsync(user, validEncodedToken);

            return result;

        }
    }
}
