using Event_Planinng_System_DAL.Models;
using Event_Planinng_System_DAL.Repos;
using Event_Planinng_System_DAL.Unit_Of_Work;
using Event_Planning_System.DTO.Mail;
using Event_Planning_System.Helpers;
using Event_Planning_System.IServices;
using Event_Planning_System.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;

namespace Event_Planning_System
{
    public class Program
	{
		public static void Main(string[] args)
		{
			var builder = WebApplication.CreateBuilder(args);


			//adding data base depency injection

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
            // Add services to the container.

            builder.Services.AddControllers();
            builder.Services.AddScoped<Iregestration, Register>();


			// Add services to the container.
			builder.Services.AddCors(options => 
			options.AddDefaultPolicy(
				builder => 
				builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader())
			);
            builder.Services.AddControllers();
			// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
			builder.Services.AddEndpointsApiExplorer();

			//swagger gen
            builder.Services.AddSwaggerGen(options => {
                options.MapType<DateOnly>(() => new OpenApiSchema
                {
                    Type = "string",
                    Format = "date"
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

			app.UseAuthorization();
			app.UseCors();


            app.MapControllers();

			app.Run();
		}
	}
}
