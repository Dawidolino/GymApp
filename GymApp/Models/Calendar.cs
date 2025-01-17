using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace GymApp.Models
{
    public class Calendar
    {
        public int Id {get; set;}
        
        [Required]
        [MaxLength(100)]
        public string Title { get; set;}

        [Required]
        public string? Instructor { get; set;}
        [Required]
        public DateTime Date { get; set;}
        [Required]
        public TimeSpan StartTime { get; set;}
        [Required]
        public TimeSpan EndTime { get; set;}
        [Required]
        [Range(1,80)]
        public int Capacity { get; set;}
        [Required]
        [Range(0,80)]
        public int AvailableSlots { get; set;}

    }
}
