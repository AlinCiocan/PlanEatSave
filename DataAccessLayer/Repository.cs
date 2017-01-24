using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

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
        public string Name { get; set; }
        public string IngredientsJson { get; set; }
        public string Preparation { get; set; }
    }

    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public virtual DbSet<Pantry> Pantries { get; set; }
        public virtual DbSet<PantryItem> PantryItems { get; set; }
        public virtual DbSet<Recipe> Recipes {get; set; }
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