import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import './Notification.css';

const Notification = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    // Retrieve user login data
    const storedUsername = sessionStorage.getItem('email');
    if (storedUsername) {
      setIsLoggedIn(true);
    }

    // Retrieve all appointments from localStorage
    const allAppointments = JSON.parse(localStorage.getItem('appointments')) || [];
    setAppointments(allAppointments);
  }, []);

  return (
    <div className="notification-layout">
      <Navbar />
      {children}
      {isLoggedIn && appointments.length > 0 ? (
        <div className="notification-box">
          <div className="notification-content">
            <h3>Upcoming Appointments:</h3>
            {appointments.map((appointment) => (
              <div key={appointment.id} className="appointment-info">
                <p><strong>Doctor:</strong> {appointment.doctorName}</p>
                <p><strong>Name:</strong> {appointment.name}</p>
                <p><strong>Date:</strong> {appointment.date}</p>
                <p><strong>Time:</strong> {appointment.time}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="notification-box">
          <p>No appointments yet, stay tuned!</p>
        </div>
      )}
    </div>
  );
};

export default Notification;