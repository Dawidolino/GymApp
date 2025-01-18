import React, { useState } from 'react';
import './Modal.css';

function EditClassInfo({ event, onClose, onEventUpdate }) {
  const [title, setTitle] = useState(event.title || '');
  const [instructor, setInstructor] = useState(event.instructor || '');
  const [startTime, setStartTime] = useState(event.startTime ? event.startTime.toISOString().slice(0, 16) : '');
  const [endTime, setEndTime] = useState(event.endTime ? event.endTime.toISOString().slice(0, 16) : '');
  const [date, setDate] = useState(event.date ? event.date.toISOString().slice(0, 16) : '');
  const [availableSlots] = useState(event.availableSlots || 0);
  const [capacity, setCapacity] = useState(event.capacity || 0);
  const [warning, setWarning] = useState(false);

  // Logic to check if capacity is less than available slots and set warning
  const handleCapacityChange = (e) => {
    const newCapacity = e.target.value;
    setCapacity(newCapacity);

    // Show warning if new capacity is less than available slots
    if (newCapacity < availableSlots) {
      setWarning(true);
    } else {
      setWarning(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedEvent = {
      id: Number(event.id),
      title,
      instructor,
      date,
      startTime,
      endTime,
      availableSlots,
      capacity,
    };

    try {
      const response = await fetch(`http://localhost:5235/api/calendar/${event.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedEvent),
      });

      if (response.ok) {
        alert('Class updated successfully!');
        onEventUpdate(); 
        onClose();
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData}`);
      }
    } catch (error) {
      console.error('Error updating class:', error);
      alert('An error occurred while updating the class.');
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Edit Class: {event.title}</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Class Title: </label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>
          <div>
            <label>Instructor: </label>
            <input type="text" value={instructor} onChange={(e) => setInstructor(e.target.value)} required />
          </div>
          <div>
            <label>Date: </label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
          </div>
          <div>
            <label>Start Time: </label>
            <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} required />
          </div>
          <div>
            <label>End Time: </label>
            <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} required />
          </div>
          <div>
            <label>Capacity: </label>
            <input
              type="number"
              value={capacity}
              onChange={handleCapacityChange}
              required
            />
          </div>
          <div>
            <label>Available Slots: </label>
            <input type="number" value={availableSlots} disabled />
          </div>          
          {warning && (
            <div className="warning-message">
              <p style={{ color: 'red' }}>
                Warning: The capacity number cannot be smaller than available slots! Remove people directly from selected class using list!               
              </p>
            </div>
          )}
          
          <div className="buttons-container">
            <button type="submit" disabled={warning}>Update Class</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
      <div className="modal-backdrop" onClick={onClose}></div>
    </div>
  );
}

export default EditClassInfo;
