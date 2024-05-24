using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Event_Planning_System.Migrations
{
    /// <inheritdoc />
    public partial class changingrelationbetweeneventattendance : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Invites");

            migrationBuilder.AddColumn<int>(
                name: "EventNavigationId",
                table: "Attendances",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<bool>(
                name: "IsSent",
                table: "Attendances",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.CreateIndex(
                name: "IX_Attendances_EventNavigationId",
                table: "Attendances",
                column: "EventNavigationId");

            migrationBuilder.AddForeignKey(
                name: "FK_Attendances_Events_EventNavigationId",
                table: "Attendances",
                column: "EventNavigationId",
                principalTable: "Events",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Attendances_Events_EventNavigationId",
                table: "Attendances");

            migrationBuilder.DropIndex(
                name: "IX_Attendances_EventNavigationId",
                table: "Attendances");

            migrationBuilder.DropColumn(
                name: "EventNavigationId",
                table: "Attendances");

            migrationBuilder.DropColumn(
                name: "IsSent",
                table: "Attendances");

            migrationBuilder.CreateTable(
                name: "Invites",
                columns: table => new
                {
                    AttendantId = table.Column<int>(type: "int", nullable: false),
                    EventId = table.Column<int>(type: "int", nullable: false),
                    IsSent = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Invites", x => new { x.AttendantId, x.EventId });
                    table.ForeignKey(
                        name: "FK_Invites_Attendances_AttendantId",
                        column: x => x.AttendantId,
                        principalTable: "Attendances",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Invites_Events_EventId",
                        column: x => x.EventId,
                        principalTable: "Events",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Invites_EventId",
                table: "Invites",
                column: "EventId");
        }
    }
}
