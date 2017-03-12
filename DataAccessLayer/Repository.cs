using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using PlanEatSave.Constants;

namespace PlanEatSave.DataAceessLayer
{
    public class ApplicationUser : IdentityUser
    {
        public string Firstname { get; set; }
        public string Lastname { get; set; }
    }

    public class Pantry
    {
        public long Id { get; set; }
        public string UserId { get; set; }
        public List<PantryItem> PantryItems { get; set; }
    }

    public class PantryItem
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public DateTime Expiration { get; set; }
        public long PantryId { get; set; }
        public Pantry Pantry { get; set; }
    }

    public class Recipe
    {
        public long Id { get; set; }
        public string UserId { get; set; }

        [MaxLength(RecipeConstants.NAME_MAX_LENGTH)]
        public string Name { get; set; }

        [MaxLength(RecipeConstants.INGREDIENTS_MAX_LENGTH)]
        public string IngredientsJson { get; set; }

        [MaxLength(RecipeConstants.PREPARATION_MAX_LENGTH)]
        public string Preparation { get; set; }
    }

    public class Meal
    {
        public string Id { get; set; }
        public string UserId { get; set; }
        public long RecipeId { get; set; }
        public DateTime MealDate { get; set; }
        public long MealOrder { get; set; }
    }

    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public virtual DbSet<Pantry> Pantries { get; set; }
        public virtual DbSet<PantryItem> PantryItems { get; set; }
        public virtual DbSet<Recipe> Recipes { get; set; }
        public virtual DbSet<Meal> Meals { get; set; }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            // Customize the ASP.NET Identity model and override the defaults if needed.
            // For example, you can rename the ASP.NET Identity table names and more.
            // Add your customizations after calling base.OnModelCreating(builder);
        }
    }
}