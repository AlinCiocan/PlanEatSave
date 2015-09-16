using System.Data.Entity;
using Entities.BoardEntities;

namespace Repository
{
    public class FoodPlanAppContext : DbContext
    {
        public FoodPlanAppContext() : base("FoodPlanAppContext")
        {       
        }


        public DbSet<BoardEntity> BoardEntities { get; set; }
        public DbSet<DayEntity> DayEntities { get; set; }
        public DbSet<CategoryEntity> CategoryEntities { get; set; }
        public DbSet<ItemEntity> ItemEntities { get; set; }


        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<BoardEntity>().ToTable("boards");
            modelBuilder.Entity<DayEntity>().ToTable("days");
            modelBuilder.Entity<CategoryEntity>().ToTable("categories");
            modelBuilder.Entity<ItemEntity>().ToTable("items");



            modelBuilder.Entity<BoardEntity>().HasMany(board => board.Days).WithRequired(day => day.Board);
            modelBuilder.Entity<DayEntity>().HasMany(day => day.Categories).WithRequired(category => category.Day);
            modelBuilder.Entity<CategoryEntity>()
                        .HasMany(category => category.Items)
                        .WithRequired(item => item.Category)
                        .WillCascadeOnDelete(true);

        }
    }
}
