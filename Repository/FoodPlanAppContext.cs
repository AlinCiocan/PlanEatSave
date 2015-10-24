using System.Data.Entity;
using System.Diagnostics;
using Entities.BoardEntities;
using Entities.UserEntities;

namespace Repository
{
    public class FoodPlanAppContext : DbContext
    {
        public FoodPlanAppContext() : base("FoodPlanAppContext")
        {
            Database.Log = s => Debug.WriteLine(s);
        }


        public DbSet<BoardEntity> BoardEntities { get; set; }
        public DbSet<DayEntity> DayEntities { get; set; }
        public DbSet<CategoryEntity> CategoryEntities { get; set; }
        public DbSet<ItemEntity> ItemEntities { get; set; }

        public DbSet<UserEntity> UserEntities { get; set; }


        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserEntity>().ToTable("users");

            modelBuilder.Entity<BoardEntity>().ToTable("boards");
            modelBuilder.Entity<DayEntity>().ToTable("days");
            modelBuilder.Entity<CategoryEntity>().ToTable("categories");
            modelBuilder.Entity<ItemEntity>().ToTable("items");



            modelBuilder.Entity<BoardEntity>()
                        .HasMany(board => board.Days)
                        .WithRequired(day => day.Board)
                        .WillCascadeOnDelete(true);

            modelBuilder.Entity<DayEntity>()
                        .HasMany(day => day.Categories)
                        .WithRequired(category => category.Day)
                        .WillCascadeOnDelete(true);

            modelBuilder.Entity<CategoryEntity>()
                        .Ignore(category => category.State)
                        .HasMany(category => category.Items)
                        .WithRequired(item => item.Category)
                        .WillCascadeOnDelete(true);

            modelBuilder.Entity<ItemEntity>()
                       .Ignore(item => item.State);

        }
    }
}
