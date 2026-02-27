using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SolarCMS.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddBadgeLabelToProduct : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "BadgeLabel",
                table: "Products",
                type: "text",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BadgeLabel",
                table: "Products");
        }
    }
}
