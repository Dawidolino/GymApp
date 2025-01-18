import React, { useState } from 'react';

function CreateClassForm() {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [capacity, setCapacity] = useState('');
  const [instructor, setInstructor] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const classData = {
      title,
      date,
      startTime,
      endTime,
      capacity,
      instructor,
    };
    console.log('Sending class data:', classData); 

    try {
      const response = await fetch('http://localhost:5235/api/calendar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(classData),
      });

      if (response.ok) {
        alert('Class created successfully');        
      } else {
        alert('Error creating class');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('There was an error creating the class.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title: </label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div>
        <label>Date: </label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </div>
      <div>
        <label>Start Time: </label>
        <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
      </div>
      <div>
        <label>End Time: </label>
        <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
      </div>
      <div>
        <label>Capacity: </label>
        <input type="number" value={capacity} onChange={(e) => setCapacity(e.target.value)} />
      </div>
      <div>
        <label>Instructor: </label>
        <input type="text" value={instructor} onChange={(e) => setInstructor(e.target.value)} />
      </div>
      <button type="submit">Create Class</button>
    </form>
  );
}

export default CreateClassForm;
