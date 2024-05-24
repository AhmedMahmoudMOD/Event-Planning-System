using Event_Planinng_System_DAL.Models;
using Event_Planinng_System_DAL.Repos;
using Event_Planinng_System_DAL.Unit_Of_Work;
using Event_Planning_System.IServices;
using Event_Planning_System.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.Identity;
using Microsoft.OpenApi.Models;

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
			builder.Services.AddAutoMapper(typeof(Program));

			builder.Services.AddScoped<UnitOfWork>();
			builder.Services.AddScoped<IEventService, EventService>();
            builder.Services.AddScoped<Iregestration, Register>();
        

			builder.Services.AddCors(Services =>
			{
				Services.AddPolicy("CorsPolicy", builder =>
				{
					builder.AllowAnyOrigin()
					.AllowAnyMethod()
					.AllowAnyHeader();
				});
			});


			builder.Services.AddControllers();


            builder.Services.AddControllers();
			// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
			builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen(options => {
                options.MapType<DateOnly>(() => new OpenApiSchema
                {
                    Type = "string",
                    Format = "date"
                });
            });








            var app = builder.Build();

			// Configure the HTTP request pipeline.
			if (app.Environment.IsDevelopment())
			{
				app.UseSwagger();
				app.UseSwaggerUI();
			}
			app.UseCors("CorsPolicy");
			app.UseAuthorization();


			app.MapControllers();

			app.Run();
		}
	}
}
