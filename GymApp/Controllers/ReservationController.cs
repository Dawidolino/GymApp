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

        // GET: api/reservations/registrants with class id, username, and email
        [HttpGet("registrants")]
        public async Task<ActionResult> GetRegistrants()
        {
            var registrants = await _context.Reservations
                .Join(_context.Calendars,
                    r => r.ClassId,
                    c => c.Id,
                    (r, c) => new
                    {
                        ReservationId = r.Id,
                        ClassId = c.Id,
                        ClassName = c.Title,
                        UserName = r.UserName,
                        UserEmail = r.UserEmail
                    })
                .OrderBy(r => r.ClassName)
                .ThenBy(r => r.UserName)   
                .ToListAsync();

            return Ok(registrants);
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

            _context.Reservations.Add(reservation);

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
