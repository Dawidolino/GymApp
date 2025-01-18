import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import ReservationForm from './ReservationForm';
import EditClassInfo from './EditClassInfo';

function Calendar() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [editingClass, setEditingClass] = useState(null);

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
    console.log("Event ID: ", event.id);
    setSelectedEvent(event);
  };

  const handleEditClass = () => {
    setEditingClass(selectedEvent);
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
      {selectedEvent && !editingClass && (
        <ReservationForm
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
          onReservationSuccess={fetchClasses}
          onEdit={handleEditClass}
          
        />
      )}
      {editingClass && (
        <EditClassInfo
          event={editingClass}
          onClose={() => setEditingClass(null)}
          onEventUpdate={fetchClasses}
        />
      )}
    </div>
  );
}

export default Calendar;
