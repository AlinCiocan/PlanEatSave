using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace PlanEatSave.Migrations
{
    public partial class AddPantry : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Pantry",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("MySQL:AutoIncrement", true),
                    UserId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Pantry", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "PantryItem",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("MySQL:AutoIncrement", true),
                    Expiration = table.Column<DateTime>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    PantryId = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PantryItem", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PantryItem_Pantry_PantryId",
                        column: x => x.PantryId,
                        principalTable: "Pantry",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_PantryItem_PantryId",
                table: "PantryItem",
                column: "PantryId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PantryItem");

            migrationBuilder.DropTable(
                name: "Pantry");
        }
    }
}
