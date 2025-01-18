import React, { useState } from 'react';
import './Modal.css';

function EditClassInfo({ event, onClose, onEventUpdate }) {
  const [title, setTitle] = useState(event.title || '');
  const [instructor, setInstructor] = useState(event.instructor || '');
  const [startTime, setStartTime] = useState(event.startTime ? event.startTime.toISOString().slice(0, 5) : '');
  const [endTime, setEndTime] = useState(event.endTime ? event.endTime.toISOString().slice(0, 5) : '');
  const [date, setDate]=useState(event.date ? event.date.toISOString().slice(0,10): '');
  const [availableSlots, setAvailableSlots] = useState(event.availableSlots || '');
  const [capacity, setCapacity] = useState(event.capacity || '');

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
        onEventUpdate(); // Refresh events after update
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
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required/>
          </div>
          <div>
            <label>Start Time: </label>
            <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} required/>
          </div>
          <div>
            <label>End Time: </label>
            <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} required/>
          </div>
          <div>
            <label>Available Slots: </label>
            <input type="number" value={availableSlots} onChange={(e) => setAvailableSlots(e.target.value)} required />
          </div>
          <div>
            <label>Capacity: </label>
            <input type="number" value={capacity} onChange={(e) => setCapacity(e.target.value)} required />
          </div>
          <div className='buttons-container'>
            <button type="submit">Update Class</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>         
        </form>
      </div>
      <div className="modal-backdrop" onClick={onClose}></div>
    </div>
  );
}

export default EditClassInfo;
