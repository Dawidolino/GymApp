import React from 'react';
import { BrowserRouter as Router, Route,Link, Routes } from 'react-router-dom';
import Calendar from './components/Calendar';  // Sprawdź poprawność ścieżki
import CreateClassForm from './components/CreateClassForm'; // Sprawdź poprawność ścieżki

function App() {
  return (
    <Router>
      <div>
        <h1>Gym App</h1>
        <nav>
          <Link to="/calendar">Go to Calendar</Link>
          <Link to="/create">Create Class</Link>
        </nav>
        <Routes>
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/create" element={<CreateClassForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
