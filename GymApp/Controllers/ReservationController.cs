using GymApp.Data;
using GymApp.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GymApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReservationController : Controller
    {
        private readonly AppDbContext _context;

        public ReservationController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/reservations
        [HttpGet]
        public async Task<ActionResult> GetReservations()
        {
            return Ok(await _context.Reservations.ToListAsync());
        }
        

        // POST: api/reservations
        [HttpPost]
        public async Task<ActionResult> MakeReservation(Reservation reservation)
        {
            var selectedClass = await _context.Calendars.FindAsync(reservation.ClassId);
            if (selectedClass == null)
            {
                return NotFound("Class not found.");
            }

            if (selectedClass.AvailableSlots <= 0)
            {
                return BadRequest("No available slots for this class.");
            }

            // Dodanie rezerwacji
            _context.Reservations.Add(reservation);

            // Zmniejszenie liczby wolnych miejsc
            selectedClass.AvailableSlots--;
            await _context.SaveChangesAsync();

            return Ok("Reservation made successfully.");
        }
        //edit api/reservations/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateReservation(int id, Reservation reservation)
        {
            if (id != reservation.Id)
            {
                return BadRequest("Invalid reservation data.");
            }

            _context.Entry(reservation).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ReservationExists(id))
                {
                    return NotFound("Reservation not found.");
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }
        // DELETE: api/reservations/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> CancelReservation(int id)
        {
            var reservation = await _context.Reservations.FindAsync(id);
            if (reservation == null)
            {
                return NotFound("Reservation not found.");
            }

            var selectedClass = await _context.Calendars.FindAsync(reservation.ClassId);
            if (selectedClass != null)
            {
                // Zwiększenie liczby wolnych miejsc po usunięciu rezerwacji
                selectedClass.AvailableSlots++;
            }

            _context.Reservations.Remove(reservation);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        private bool ReservationExists(int id)
        {
            return _context.Reservations.Any(e => e.Id == id);
        }
    }
}
