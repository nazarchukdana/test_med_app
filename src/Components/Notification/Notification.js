import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import './Notification.css';

const Notification = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [appointments, setAppointments] = useState([]);
  const [appointmentsIC, setAppointmentsIC] = useState([]);
  const [showNotification, setShowNotification] = useState(false);

  // Load data when the component is mounted
  const loadData = () => {
    const storedUsername = sessionStorage.getItem('email'); // Retrieve the logged-in user's email
    if (storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
    }

    const allAppointments = JSON.parse(localStorage.getItem('allAppointments')) || [];
     const allAppointmentsIC = JSON.parse(localStorage.getItem('allAppointmentsIC')) || [];
    // Filter appointments based on the logged-in user
    const userAppointments = allAppointments.filter(appointment => appointment.user === storedUsername);
const userAppointmentsIC = allAppointmentsIC.filter(appointment => appointment.user === storedUsername);

    if (userAppointments.length > 0 || userAppointmentsIC.length > 0) {
      setAppointments(userAppointments);
      setAppointmentsIC(userAppointmentsIC);
      setShowNotification(true);
    } else {
      setAppointments([]);
      setAppointmentsIC([]);
      setShowNotification(false);
    }
  };

  // Initial load of data and listeners for appointment updates
  useEffect(() => {
    loadData();

    const handleStorageChange = () => {
      loadData();
    };

    const handleAppointmentUpdate = (event) => {
      if (event.detail.type === 'cancel' || event.detail.type === 'create') {
        loadData(); // Reload data if an appointment is created or canceled
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('appointmentUpdated', handleAppointmentUpdate);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('appointmentUpdated', handleAppointmentUpdate);
    };
  }, []);

  // Listen for changes in appointments and show notifications accordingly
  useEffect(() => {
    if (appointments.length > 0 || appointmentsIC.length > 0) {
      setShowNotification(true);
    } else {
      setShowNotification(false);
    }
  }, [appointments, appointmentsIC]);

  return (
    <div className="notification-layout">
      <Navbar />
      {children}
      {isLoggedIn && showNotification && (
        <div className="notification-box">
          <div className="notification-content">
            <h3>Appointment Details</h3>
            {appointments.map((appointmentData, index) => (
              <div key={index} className="appointment-info">
                <p><strong>Doctor:</strong> {appointmentData.doctor.name}</p>
                <p><strong>Speciality:</strong> {appointmentData.doctor.speciality}</p>
                <p><strong>Patient Name:</strong> {appointmentData.appointment.name}</p>
                <p><strong>Date:</strong> {appointmentData.appointment.date}</p>
                <p><strong>Time:</strong> {appointmentData.appointment.time}</p>
              </div>
            ))}
            {appointmentsIC.map((appointmentData, index) => (
              <div key={index} className="appointment-info">
                <p><strong>Doctor:</strong> {appointmentData.doctor.name}</p>
                <p><strong>Speciality:</strong> {appointmentData.doctor.speciality}</p>
                <p><strong>Patient Name:</strong> {appointmentData.appointment.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Notification;
