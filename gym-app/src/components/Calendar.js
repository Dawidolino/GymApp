import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

function Calendar() {
  const [events, setEvents] = useState([]);

  const fetchClasses = async () => {
    const response = await fetch('http://localhost:5235/api/calendar/events');
    const data = await response.json();
    setEvents(data);
  };

  const handleEventClick = async (eventClickInfo) => {
    const eventId = eventClickInfo.event.id;
    const availableSpots = eventClickInfo.event.extendedProps.availableSlots;

    if (availableSpots > 0) {
      const confirmation = window.confirm(
        `You have clicked on ${eventClickInfo.event.title}. Spots available: ${availableSpots}. Do you want to book a spot?`
      );
     //logic for reserving a place for classes
     if (confirmation) {
      try {
        // Wysyłanie rezerwacji do API
        const response = await fetch('http://localhost:5235/api/reservation', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            classId: eventId, // Id klasy, której dotyczy rezerwacja
            userId: 1, // Możesz to zmienić, aby dynamicznie przekazywać id użytkownika
          }),
        });

        if (response.ok) {
          alert('Reservation made successfully!');
          fetchClasses(); // Odświeżenie kalendarza
        } else {
          const errorData = await response.json();
          alert(`Error: ${errorData}`);
        }
      } catch (error) {
        console.error('Error making reservation:', error);
        alert('An error occurred while making the reservation.');
      }
    }
    } else {
      alert(`No spots available for ${eventClickInfo.event.title}.`);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  return (
    <div>
      <h2>Classes Calendar</h2>
      <FullCalendar
        plugins={[dayGridPlugin]}
        events={events}
        eventClick={handleEventClick} // Obsługuje kliknięcie w event
      />
    </div>
  );
}

export default Calendar;
