using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Event_Planning_System.Migrations
{
    /// <inheritdoc />
    public partial class updatinglocation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Loacation",
                table: "EventSchedules",
                newName: "Location");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Location",
                table: "EventSchedules",
                newName: "Loacation");
        }
    }
}
