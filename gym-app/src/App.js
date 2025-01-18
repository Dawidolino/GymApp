import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes, Navigate } from 'react-router-dom';
import Calendar from './components/Calendar'; 
import CreateClassForm from './components/CreateClassForm';
import RegistrantsList from './components/RegistransList';
import './styles/App.css';  

function App() {
  return (
    <Router>
      <div>
        <h1>Gym App</h1>
        <nav>
          <Link to="/calendar">Go to Calendar</Link>
          <Link to="/create">Create Class</Link>        
          <Link to="/registrants">Registrants List</Link>  
        </nav>
        <Routes>         
          <Route path="/" element={<Navigate to="/calendar" />} />  {/* set /calendar to be the main page */}
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/create" element={<CreateClassForm />} />
          <Route path="/registrants" element={<RegistrantsList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
