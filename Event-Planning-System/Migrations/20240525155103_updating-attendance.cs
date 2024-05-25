using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Event_Planning_System.Migrations
{
    /// <inheritdoc />
    public partial class updatingattendance : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Attendances_Events_EventNavigationId",
                table: "Attendances");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Attendances",
                table: "Attendances");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "Attendances");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "Attendances");

            migrationBuilder.RenameColumn(
                name: "EventNavigationId",
                table: "Attendances",
                newName: "EventId");

            migrationBuilder.RenameIndex(
                name: "IX_Attendances_EventNavigationId",
                table: "Attendances",
                newName: "IX_Attendances_EventId");

            migrationBuilder.AlterColumn<string>(
                name: "Email",
                table: "Attendances",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Attendances",
                table: "Attendances",
                columns: new[] { "Email", "EventId" });

            migrationBuilder.AddForeignKey(
                name: "FK_Attendances_Events_EventId",
                table: "Attendances",
                column: "EventId",
                principalTable: "Events",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Attendances_Events_EventId",
                table: "Attendances");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Attendances",
                table: "Attendances");

            migrationBuilder.RenameColumn(
                name: "EventId",
                table: "Attendances",
                newName: "EventNavigationId");

            migrationBuilder.RenameIndex(
                name: "IX_Attendances_EventId",
                table: "Attendances",
                newName: "IX_Attendances_EventNavigationId");

            migrationBuilder.AlterColumn<string>(
                name: "Email",
                table: "Attendances",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AddColumn<int>(
                name: "Id",
                table: "Attendances",
                type: "int",
                nullable: false,
                defaultValue: 0)
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "Attendances",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Attendances",
                table: "Attendances",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Attendances_Events_EventNavigationId",
                table: "Attendances",
                column: "EventNavigationId",
                principalTable: "Events",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
