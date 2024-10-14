import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import './Notification.css';
// Function component Notification to display user notifications
const Notification = ({ children }) => {
  // State variables to manage user authentication, username, doctor data, and appointment data
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [doctorData, setDoctorData] = useState({});
  const [appointmentData, setAppointmentData] = useState({});
   const [showNotification, setShowNotification] = useState(false);
  // useEffect hook to perform side effects in the component
  const loadData = () => {
    const storedUsername = sessionStorage.getItem('email');
    const storedDoctorData = JSON.parse(localStorage.getItem('doctorData'));
    const storedAppointmentData = JSON.parse(localStorage.getItem(storedDoctorData?.name));
    if (storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
    }

    if (storedDoctorData) {
      setDoctorData(storedDoctorData);
    }

    if (storedAppointmentData) {
      setAppointmentData(storedAppointmentData);
      setShowNotification(true); // Show notification if appointment data is present
    } else {
      setShowNotification(false); // Hide notification if no appointment data
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
      if (event.detail.type === 'cancel') {
        setAppointmentData({});
        setDoctorData({}); // Clear appointment data
        setShowNotification(false); // Hide notification when appointment is canceled
      } else {
        loadData(); // Reload data if a new appointment is created
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('appointmentUpdated', handleAppointmentUpdate); // Listen for custom event

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
            <h3>appointment Details</h3>
              <div className="appointment-info">
                <p><strong>Doctor:</strong> {doctorData?.name}</p>
                 <p><strong>Speciality</strong> {doctorData?.speciality}</p>
                  <p><strong>Name</strong> {appointmentData?.name}</p>
                   <p><strong>Date</strong> {appointmentData?.date}</p>
                    <p><strong>Time</strong> {appointmentData?.time}</p>
              </div>
            
          </div>
        </div>
        </>
      )};
    </div>
  );
};

export default Notification;