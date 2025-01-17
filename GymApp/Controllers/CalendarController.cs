using Microsoft.AspNetCore.Mvc;
using GymApp.Data;
using GymApp.Models;
using Microsoft.EntityFrameworkCore;

namespace GymApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CalendarController : Controller
    {
        private readonly AppDbContext _context;
        public CalendarController(AppDbContext context)
        {
            _context = context; ;
        }
        //get: api/calendar
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Calendar>>> GetClasses()
        {
            return await _context.Calendars.ToListAsync();
        }
        //get: api/calendar/events
        [HttpGet("events")]
        public async Task<ActionResult<IEnumerable<Calendar>>> GetEvents()
        {
            var classes = await _context.Calendars.ToListAsync();

            var events = classes.Select(c => new
            {
                id = c.Id,
                title = c.Title,
                start = c.Date.Add(c.StartTime),
                end = c.Date.Add(c.EndTime),
                extendedProps = new
                {
                    instructor = c.Instructor,
                    availableSlots = c.AvailableSlots,
                    capacity = c.Capacity
                }
            });

            return Ok(events);
        }
        //post: api/calendar
        [HttpPost]
        public async Task<ActionResult<Calendar>> PostClass(Calendar calendar)
        {
            if (calendar == null)
            {
                return BadRequest("Invalid class data.");
            }
            calendar.AvailableSlots = calendar.Capacity;
            _context.Calendars.Add(calendar);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetClasses), new { id = calendar.Id }, calendar);
        }
        //update: api/calendar/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateClass(int id, Calendar calendar)
        {
            if (id != calendar.Id)
            {
                return BadRequest("Class Id mismatch");
            }

            _context.Entry(calendar).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ClassExists(id))
                {
                    return NotFound("Class not found");
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }
        //delete: api/calendar/{id}
        [HttpDelete("{id}")]
        public async Task<ActionResult<Calendar>> DeleteClass(int id)
        {
            var calendar = await _context.Calendars.FindAsync(id);
            if (calendar == null)
            {
                return NotFound();
            }

            _context.Calendars.Remove(calendar);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        private bool ClassExists(int id)
        {
            return _context.Calendars.Any(e => e.Id == id);
        }
    }
}
