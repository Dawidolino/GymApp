using System.ComponentModel.DataAnnotations;

namespace GymApp.Models
{
    public class Reservation
    {
        public int Id { get; set; }

        [Required]
        public int ClassId { get; set; }

        [Required]
        public string UserName { get; set; }

        [Required]
        [EmailAddress]
        public string UserEmail { get; set; }

        public DateTime ReservationDate { get; set; } = DateTime.Now;

    }
}
