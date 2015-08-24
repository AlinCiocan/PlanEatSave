namespace Repository.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Initial : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.boards",
                c => new
                    {
                        Id = c.Long(nullable: false, identity: true),
                        Title = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.days",
                c => new
                    {
                        Id = c.Long(nullable: false, identity: true),
                        Date = c.DateTime(nullable: false),
                        BoardId = c.Long(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.boards", t => t.BoardId, cascadeDelete: true)
                .Index(t => t.BoardId);
            
            CreateTable(
                "dbo.categories",
                c => new
                    {
                        Id = c.Long(nullable: false, identity: true),
                        Title = c.String(),
                        DayId = c.Long(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.days", t => t.DayId, cascadeDelete: true)
                .Index(t => t.DayId);
            
            CreateTable(
                "dbo.items",
                c => new
                    {
                        Id = c.Long(nullable: false, identity: true),
                        Title = c.String(),
                        CategoryId = c.Long(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.categories", t => t.CategoryId, cascadeDelete: true)
                .Index(t => t.CategoryId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.days", "BoardId", "dbo.boards");
            DropForeignKey("dbo.categories", "DayId", "dbo.days");
            DropForeignKey("dbo.items", "CategoryId", "dbo.categories");
            DropIndex("dbo.items", new[] { "CategoryId" });
            DropIndex("dbo.categories", new[] { "DayId" });
            DropIndex("dbo.days", new[] { "BoardId" });
            DropTable("dbo.items");
            DropTable("dbo.categories");
            DropTable("dbo.days");
            DropTable("dbo.boards");
        }
    }
}
