import React, { useEffect, useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './DoctorCard.css';
import { Link } from 'react-router-dom'
import AppointmentForm from '../AppointmentForm/AppointmentForm';

const DoctorCard = ({ name, speciality, experience, ratings, profilePic }) => {
  const [showModal, setShowModal] = useState(false);
  const [appointments, setAppointments] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
  useEffect(() => {
    const storedUserName = sessionStorage.getItem('email');
    
    if (storedUserName) {
      setIsLoggedIn(true);
      setUser(storedUserName); // Set the logged-in user's name
    } else {
      setIsLoggedIn(false);
      setUser(null);
    }
  }, []);
    const handleBooking = () => {
    if (isLoggedIn) {
      setShowModal(true);
    } else {
      alert('Please log in to book an appointment.');
    }
  };
 const dispatchAppointmentEvent = (type) => {
    const event = new CustomEvent('appointmentUpdated', { detail: { type } });
    window.dispatchEvent(event);
  };

  const handleCancel = (appointmentId) => {
    const updatedAppointments = appointments.filter((appointment) => appointment.id !== appointmentId);
    setAppointments(updatedAppointments);
    let allAppointments = JSON.parse(localStorage.getItem('allAppointments')) || [];
   allAppointments = allAppointments.filter(
      (app) => !(app.user === user && app.appointment.id === appointmentId)
    );
    localStorage.setItem('allAppointments', JSON.stringify(allAppointments)); // Remove the appointment for this doctor

    // Dispatch the event to notify others of the appointment cancellation
    dispatchAppointmentEvent('cancel');
  };

  const handleFormSubmit = (appointmentData) => {
    const newAppointment = {
      id: uuidv4(),
      ...appointmentData,
    };

    const doctorData = {
      name,
      speciality,
    };

    const updatedAppointments = [...appointments, newAppointment];
    setAppointments(updatedAppointments);
    setShowModal(false);
    
    // Store data in localStorage
    let allAppointments = JSON.parse(localStorage.getItem('allAppointments')) || [];

    // Add new appointment along with doctor details to the global array
    allAppointments.push({ doctor: doctorData, appointment: newAppointment, user: user });

    // Save the updated appointments array back to localStorage
    localStorage.setItem('allAppointments', JSON.stringify(allAppointments));

    // Dispatch the event to notify others of the new appointment
    dispatchAppointmentEvent('create');
  };
  useEffect(() => {
    const allAppointments = JSON.parse(localStorage.getItem('allAppointments')) || [];
    const userAppointments = allAppointments.filter(
      (app) => app.doctor.name === name && app.user === user
    );

    if (userAppointments.length > 0) {
      setAppointments(userAppointments.map((app) => app.appointment));
    }
  }, [name, user]);

  return (
    <div>
    <div className="doctor-card-container">
      <div className="doctor-card-details-container">
        <div className="doctor-card-profile-image-container">
        <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16"> <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/> </svg>
        </div>
        <div className="doctor-card-details">
          <div className="doctor-card-detail-name">{name}</div>
          <div className="doctor-card-detail-speciality">{speciality}</div>
          <div className="doctor-card-detail-experience">{experience} years experience</div>
          <div className="doctor-card-detail-consultationfees">Ratings: {ratings}</div>
        </div>
      </div>
      <div className="doctor-card-options-container">
       <Popup
          style={{ backgroundColor: '#FFFFFF' }}
          trigger={
            <button className={`book-appointment-btn ${appointments.length > 0 ? 'cancel-appointment' : ''}`}>
              {!isLoggedIn ? (
                <div><Link to="/login">Log In</Link></div> // Show "Log In" if not logged in
                    ) : (
                appointments.length > 0 ? (
                    <div>Cancel Appointment</div> // Show "Cancel Appointment" if already booked
                ) : (
                    <div>Book Appointment</div> // Show "Book Appointment" if no appointment yet
                )
                )}
                <div>No Booking Fee</div>
            </button>
          }
          modal
          open={showModal}
          onClose={() => setShowModal(false)}
        >
          {(close) => (
            <div className="doctorbg" style={{ height: '100vh', overflow: 'scroll' }}>
              <div>
                <div className="doctor-card-profile-image-container">
                <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16"> <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/> </svg>
                </div>
                <div className="doctor-card-details">
                  <div className="doctor-card-detail-name">{name}</div>
                  <div className="doctor-card-detail-speciality">{speciality}</div>
                  <div className="doctor-card-detail-experience">{experience} years experience</div>
                  <div className="doctor-card-detail-consultationfees">Ratings: {ratings}</div>
                </div>
              </div>

              {appointments.length > 0 ? (
                <>
                  <h3 style={{ textAlign: 'center' }}>Appointment Booked!</h3>
                  {appointments.map((appointment) => (
                    <div className="bookedInfo" key={appointment.id}>
                      <p>Name: {appointment.name}</p>
                      <p>Phone Number: {appointment.phoneNumber}</p>
                      <p>Date: {appointment.date}</p>
                      <p>Time: {appointment.time}</p>
                      <button onClick={() => handleCancel(appointment.id)}>Cancel Appointment</button>
                    </div>
                  ))}
                </>
              ) : (
                <AppointmentForm doctorName={name} doctorSpeciality={speciality} onSubmit={handleFormSubmit} />
              )}
            </div>
          )}
        </Popup> 
      </div>
    </div>
    
    </div>
  );
};

export default DoctorCard;
