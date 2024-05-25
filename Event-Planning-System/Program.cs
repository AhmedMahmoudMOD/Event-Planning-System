using Event_Planinng_System_DAL.Models;
using Event_Planinng_System_DAL.Repos;
using Event_Planinng_System_DAL.Unit_Of_Work;
using Event_Planning_System.DTO.Mail;
using Event_Planning_System.Helpers;
using Event_Planning_System.IServices;
using Event_Planning_System.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;

namespace Event_Planning_System
{
    public class Program
	{
		public static void Main(string[] args)
		{
			var builder = WebApplication.CreateBuilder(args);

			

            var connectionString = builder.Configuration.GetConnectionString("DefaultConnection") ??
                throw new InvalidOperationException("No connection string was found");

            builder.Services.AddIdentity<User, Role>().AddEntityFrameworkStores<dbContext>();

			builder.Services.AddDbContext<dbContext>(optionBuiler =>
			{
				optionBuiler.UseLazyLoadingProxies().UseSqlServer
				(connectionString ,b => b.MigrationsAssembly("Event-Planning-System"));
			});

			//add dependency injection
			builder.Services.AddAutoMapper(typeof(Program));

			builder.Services.AddScoped<UnitOfWork>();
			builder.Services.AddScoped<IEventService, EventService>();
			builder.Services.Configure<AzureStorage>(builder.Configuration.GetSection("AzureStorage"));
			builder.Services.Configure<MailInfoDto>(builder.Configuration.GetSection("MailInfo"));
            builder.Services.AddScoped<IBlobServices, BlobService>();
            builder.Services.AddScoped<ISendEmailService, SendEmailService>();
            builder.Services.AddScoped<Iregestration, Register>();
            builder.Services.AddScoped<IaccountServices, AccountServices>();
            // Add services to the container.

            builder.Services.AddControllers();
           

			builder.Services.AddScoped<IProfileService, Profile>();

			builder.Services.AddCors(Services =>
			{
				Services.AddPolicy("CorsPolicy", builder =>
				{
					builder.AllowAnyOrigin()
					.AllowAnyMethod()
					.AllowAnyHeader();
				});
			});

            var jwtSettings = builder.Configuration.GetSection("Jwt");
            var key = Encoding.UTF8.GetBytes(jwtSettings["Key"]);

            builder.Services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = jwtSettings["Issuer"],
                    ValidAudience = jwtSettings["Audience"],
                    IssuerSigningKey = new SymmetricSecurityKey(key)
                };
            });


            // Add services to the container.


            builder.Services.AddControllers();
			builder.Services.AddEndpointsApiExplorer();

			//swagger gen
            builder.Services.AddSwaggerGen(options => {
                options.MapType<DateOnly>(() => new OpenApiSchema
                {
                    Type = "string",
                    Format = "date"
                });
                options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    In = ParameterLocation.Header,
                    Description = "Please enter into field the word 'Bearer' followed by a space and the JWT value",
                    Name = "Authorization",
                    Type = SecuritySchemeType.ApiKey,
                    Scheme = "Bearer"
                });
                options.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference
                            {
                                Type = ReferenceType.SecurityScheme,
                                Id = "Bearer"
                            }
                        },
                        new string[] {}
                    }
                });




				options.OperationFilter<FileUploadOperationFilter>();
				options.EnableAnnotations();
            });


            var app = builder.Build();

			// Configure the HTTP request pipeline.
			if (app.Environment.IsDevelopment())
			{
				app.UseDeveloperExceptionPage();
				app.UseSwagger();
				app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Abdellatief was here"));
			}
			app.UseCors("CorsPolicy");
			app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
