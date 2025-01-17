import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import ReservationForm from './ReservationForm';

function Calendar() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const fetchClasses = async () => {
    const response = await fetch('http://localhost:5235/api/calendar/events');
    const data = await response.json();
    setEvents(data);
  };

  const handleEventClick = (eventClickInfo) => {
    const event = {
      id: eventClickInfo.event.id,
      title: eventClickInfo.event.title,
      start: eventClickInfo.event.start,
      end: eventClickInfo.event.end,
      instructor: eventClickInfo.event.extendedProps.instructor,
      capacity: eventClickInfo.event.extendedProps.capacity,
      availableSlots: eventClickInfo.event.extendedProps.availableSlots,
    };

  console.log('Selected Event:', event); // Log the event data
  
  setSelectedEvent(event);
    // if (event.availableSlots > 0) {
    //   setSelectedEvent(event);
    // } else {
    //   alert(`No spots available for ${event.title}.`);
    // }
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
        eventClick={handleEventClick}
      />
      {selectedEvent && (
        <ReservationForm
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
          onReservationSuccess={fetchClasses}
        />
      )}
    </div>
  );
}

export default Calendar;
