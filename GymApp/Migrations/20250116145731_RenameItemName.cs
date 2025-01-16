using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GymApp.Migrations
{
    /// <inheritdoc />
    public partial class RenameItemName : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "AvaiableSlots",
                table: "Calendars",
                newName: "AvailableSlots");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "AvailableSlots",
                table: "Calendars",
                newName: "AvaiableSlots");
        }
    }
}
