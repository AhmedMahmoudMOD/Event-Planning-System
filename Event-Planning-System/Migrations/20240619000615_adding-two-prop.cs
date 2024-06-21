using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Event_Planning_System.Migrations
{
    /// <inheritdoc />
    public partial class addingtwoprop : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "EventSchedules",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Loacation",
                table: "EventSchedules",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Description",
                table: "EventSchedules");

            migrationBuilder.DropColumn(
                name: "Loacation",
                table: "EventSchedules");
        }
    }
}
