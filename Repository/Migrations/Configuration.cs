using Repository.Seed;

namespace Repository.Migrations
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<Repository.FoodPlanAppContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(FoodPlanAppContext context)
        {
            //  This method will be called after migrating to the latest version.

            //  You can use the DbSet<T>.AddOrUpdate() helper extension method 
            //  to avoid creating duplicate seed data. E.g.
            //
            //    context.People.AddOrUpdate(
            //      p => p.FullName,
            //      new Person { FullName = "Andrew Peters" },
            //      new Person { FullName = "Brice Lambson" },
            //      new Person { FullName = "Rowan Miller" }
            //    );
            //


            // remove all boards before seeding with a board

//            const string storedProcedureToCleanDataFromDatabase = "spCleanDataFromDatabase";
//            context.Database.ExecuteSqlCommand(storedProcedureToCleanDataFromDatabase);


            context.BoardEntities.AddOrUpdate(BoardGenerator.GenerateDefaultBoard());


        }
    }
}
