import React, { useEffect, useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './DoctorCard.css';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';
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
      setUser(storedUserName);
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
    localStorage.setItem('allAppointments', JSON.stringify(allAppointments));

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
    
    let allAppointments = JSON.parse(localStorage.getItem('allAppointments')) || [];
    allAppointments.push({ doctor: doctorData, appointment: newAppointment, user: user });
    localStorage.setItem('allAppointments', JSON.stringify(allAppointments));
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
            <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16"> 
              <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/> 
            </svg>
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
                  <div><Link to="/login">Log In</Link></div> 
                ) : (
                  appointments.length > 0 ? (
                    <div>Cancel Appointment</div>
                  ) : (
                    <div>Book Appointment</div>
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
                {isLoggedIn ? (
                  <div>
                    <div className="doctor-card-profile-image-container">
                      <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
                        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                      </svg>
                    </div>
                    <div className="doctor-card-details">
                      <div className="doctor-card-detail-name">{name}</div>
                      <div className="doctor-card-detail-speciality">{speciality}</div>
                      <div className="doctor-card-detail-experience">{experience} years experience</div>
                      <div className="doctor-card-detail-consultationfees">Ratings: {ratings}</div>
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
                ) : (
                  <div style={{ textAlign: 'center', padding: '20px' }}>
                    <h2>Please Log In to Book an Appointment</h2>
                    <Link to="/login" className="login-link">Go to Login</Link>
                  </div>
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
