import React, { useState, useEffect } from 'react';
import './RegistrantsList.css';
function RegistrantsList() {
  const [registrants, setRegistrants] = useState([]);

  const fetchRegistrants = async () => {
    try {
      const response = await fetch('http://localhost:5235/api/reservation/registrants');
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      const processedRegistrants = Array.isArray(data)
        ? data.map((reservation) => {
            const fullName = reservation.userName || 'Unknown Unknown';
            const [name, surname] = fullName.split(' ');

            return {
              id: reservation.reservationId,
              name: name || 'Unknown',
              surname: surname || 'Unknown',
              email: reservation.userEmail || 'Unknown',
              classTitle: reservation.className || 'Unknown Class',
            };
          })
        : [];

      setRegistrants(processedRegistrants);
    } catch (error) {
      console.error('Error fetching registrants:', error);
    }
  };

  useEffect(() => {
    fetchRegistrants();
  }, []);

  return (
    <div>
    <h2>Registrants List</h2>
    <table className="registrants-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Surname</th>
          <th>Email</th>
          <th>Class</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {registrants.map((registrant) => (
          <tr key={registrant.email}>
            <td>{registrant.name}</td>
            <td>{registrant.surname}</td>
            <td>{registrant.email}</td>
            <td>{registrant.classTitle}</td>
            <td>             
              <button className="remove-button">Remove</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  );
}

export default RegistrantsList;
