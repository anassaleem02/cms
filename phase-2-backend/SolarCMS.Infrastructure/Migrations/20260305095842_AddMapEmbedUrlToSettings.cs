using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SolarCMS.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddMapEmbedUrlToSettings : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "MapEmbedUrl",
                table: "SiteSettings",
                type: "text",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MapEmbedUrl",
                table: "SiteSettings");
        }
    }
}
