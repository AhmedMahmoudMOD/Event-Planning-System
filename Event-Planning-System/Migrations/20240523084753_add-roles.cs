using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Event_Planning_System.Migrations
{
    /// <inheritdoc />
    public partial class addroles : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] {  "Name", "NormalizedName", "ConcurrencyStamp" },
                values : new object []{ "User" , "User".ToUpper(), Guid.NewGuid().ToString()}
            );
            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Name", "NormalizedName", "ConcurrencyStamp" },
                values: new object[] { "Planner", "Planner".ToUpper(), Guid.NewGuid().ToString() }
            );
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("DELETE FROM [AspNetRoles]");
        }
    }
}
