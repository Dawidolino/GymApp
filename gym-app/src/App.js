import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

function App() {
  return (
    <Router>
      <div>
        <h1>Gym App</h1>
        <nav>
          <Link to="/calendar">Go to Calendar</Link>
        </nav>
        <Switch>
          <Route path="/calendar" component={Calendar} />
          <Route path="/" exact>
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Home() {
  return <div>Welcome to the gym app. Click the button to view the calendar.</div>;
}

function Calendar() {
  const [events, setEvents] = useState([]);

  const fetchClasses = async () => {
    const response = await fetch('http://localhost:5235/api/calendar');
    const data = await response.json();
    setEvents(data);
  };

  const handleEventClick = (eventClickInfo) => {
    const eventId = eventClickInfo.event.id;
    const availableSpots = eventClickInfo.event.extendedProps.availableSpots;

    if (availableSpots > 0) {
      alert(`You have clicked on ${eventClickInfo.event.title}. Spots available: ${availableSpots}. Click to book.`);
      // Można tu dodać logikę do zapisania użytkownika na zajęcia
    } else {
      alert(`No spots available for ${eventClickInfo.event.title}.`);
    }
  };

  React.useEffect(() => {
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

export default App;
