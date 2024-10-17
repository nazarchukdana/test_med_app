import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import './Notification.css';
// Function component Notification to display user notifications
const Notification = ({ children }) => {
  // State variables to manage user authentication, username, doctor data, and appointment data
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [doctorData, setDoctorData] = useState(null);
  const [appointments, setAppointments] = useState([]);
   const [showNotification, setShowNotification] = useState(false);
  // useEffect hook to perform side effects in the component
  const loadData = () => {
    const storedUsername = sessionStorage.getItem('email');
    const storedAppointments = JSON.parse(localStorage.getItem('allAppointments')) || [];
    if (storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
    }
    if (storedAppointments.length > 0) {
      setAppointments(storedAppointments);
      setShowNotification(true);
    } else {
      setAppointments([]);
      setShowNotification(false);
    }
  };

  // Initial load of data
 useEffect(() => {
    loadData();

    // Listen for storage events
    const handleStorageChange = () => {
      loadData();
    };

    const handleAppointmentUpdate = (event) => {
       if (event.detail.type === 'cancel' || event.detail.type === 'create') {
        loadData(); // Reload data if an appointment is canceled
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('appointmentUpdated', handleAppointmentUpdate);
    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('appointmentUpdated', handleAppointmentUpdate); // Cleanup event listener
    };
  }, []);
 // Empty dependency array ensures useEffect runs only once after initial render
  // Effect that listens for changes in appointmentData state
useEffect(() => {
    // Show notification if both appointmentData and doctorData are not empty
    if (appointmentData && doctorData) {
      setShowNotification(true);
    } else {
      setShowNotification(false);
    }
  }, [appointmentData, doctorData]);

  return (
    <div className="notification-layout">
      <Navbar />
      {children}
      {/*isLoggedIn &&*/ showNotification && (
        <>
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
            </div>
          </div>
        </>
      )};
    </div>
  );
};

export default Notification;
