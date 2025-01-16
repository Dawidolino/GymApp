using GymApp.Models;
using Microsoft.EntityFrameworkCore;

namespace GymApp.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Calendar> Calendars { get; set; }
        public DbSet<Reservation> Reservations { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            //foreign key in Reservation table
            modelBuilder.Entity<Reservation>()
                .HasOne<Calendar>()
                .WithMany()
                .HasForeignKey(r => r.ClassId)
                .OnDelete(DeleteBehavior.Cascade);  
        }
    }
}
