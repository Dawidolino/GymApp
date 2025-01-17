import React, { useState } from 'react';
import './Modal.css';

function ReservationForm({ event, onClose, onReservationSuccess }) {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const reservationData = {
      classId: event.id,
      userName,
      userEmail,
    };

    try {
      const response = await fetch('http://localhost:5235/api/reservation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reservationData),
      });

      if (response.ok) {
        alert('Reservation made successfully!');
        onReservationSuccess(); // Odśwież kalendarz
        onClose(); // Zamknij formularz
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData}`);
      }
    } catch (error) {
      console.error('Error making reservation:', error);
      alert('An error occurred while making the reservation.');
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Book a spot for: {event.title}</h3>
        <p>
            <strong>Instructor:</strong> {event.instructor}
          </p>
          <p>
            <strong>Time:</strong> {new Date(event.start).toLocaleTimeString()} -{' '}
            {new Date(event.end).toLocaleTimeString()}
          </p>
          <p>
            <strong>Availability:</strong> {event.availableSlots}/{event.capacity}
          </p>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name: </label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Email: </label>
            <input
              type="email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit">Reserve</button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
      <div className="modal-backdrop" onClick={onClose}></div>
    </div>
  );
}

export default ReservationForm;
