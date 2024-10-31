import React, { useState, useEffect } from 'react';
import GiveReviews from './GiveReviews/GiveReviews';
import './ReviewForm.css';

const ReviewForm = () => {
  const [consultations, setConsultations] = useState([]);
  const [selectedConsultation, setSelectedConsultation] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  const mergeAppointments = (appointments1, appointments2) => {
    const merged = [...appointments1];

    appointments2.forEach(appointment2 => {
      const existing = merged.find(appointment1 => appointment1.doctor.name === appointment2.doctor.name);

      if (existing) {
        existing.appointments = [...existing.appointments, ...appointment2.appointments];
      } else {
        merged.push(appointment2);
      }
    });

    return merged;
  };

  const loadConsultationsFromStorage = () => {
    const storedAppointments = JSON.parse(localStorage.getItem('allAppointments')) || [];
    const storedAppointmentsIC = JSON.parse(localStorage.getItem('allAppointmentsIC')) || [];
    const storedUsername = sessionStorage.getItem('email');

    if (storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);

      const userAppointments = storedAppointments.filter(appointment => appointment.user === storedUsername);
      const userAppointmentsIC = storedAppointmentsIC.filter(appointment => appointment.user === storedUsername);

      const transformedAppointments = userAppointments.map(appointment => ({
        doctor: {
          name: appointment.doctor.name,
          speciality: appointment.doctor.speciality,
        },
        appointments: [{
          review: appointment.review || '',
          feedbackSubmitted: !!appointment.review,
        }],
      }));

      const transformedAppointmentsIC = userAppointmentsIC.map(appointment => ({
        doctor: {
          name: appointment.doctor.name,
          speciality: appointment.doctor.speciality,
        },
        appointments: [{
          review: appointment.review || '',
          feedbackSubmitted: !!appointment.review,
        }],
      }));

      const mergedConsultations = mergeAppointments(transformedAppointments, transformedAppointmentsIC);

      setConsultations(mergedConsultations);
    } else {
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    loadConsultationsFromStorage();

    const handleStorageChange = () => {
      loadConsultationsFromStorage();
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleProvideFeedback = (consultation) => {
    setSelectedConsultation(consultation);
  };

  const handleReviewSubmit = (reviewData) => {
  setConsultations((prevConsultations) =>
    prevConsultations.map((consultation) =>
      consultation.doctor.name === reviewData.doctorName
        ? {
            ...consultation,
            appointments: [
              {
                ...consultation.appointments[0],
                review: reviewData.review,
                feedbackSubmitted: true,
              },
            ],
          }
        : consultation
    )
  );
  setSelectedConsultation(null);

  let allAppointments = JSON.parse(localStorage.getItem('allAppointments')) || [];
  let allAppointmentsIC = JSON.parse(localStorage.getItem('allAppointmentsIC')) || [];

  allAppointments = allAppointments.map(appointment =>
    appointment.doctor.name === reviewData.doctorName && appointment.user === username
      ? { ...appointment, review: reviewData.review }
      : appointment
  );

  allAppointmentsIC = allAppointmentsIC.map(appointment =>
    appointment.doctor.name === reviewData.doctorName && appointment.user === username
      ? { ...appointment, review: reviewData.review }
      : appointment
  );

  localStorage.setItem('allAppointments', JSON.stringify(allAppointments));
  localStorage.setItem('allAppointmentsIC', JSON.stringify(allAppointmentsIC));
};

  return (
    <>
      {!isLoggedIn ? (
        <div>Please log in to view your consultations.</div>
      ) : (
        <>
          {!selectedConsultation ? (
            <div className="review-form-container">
              <h2>Reviews</h2>
              <table className="consultation-table">
                <thead>
                  <tr>
                    <th>Consultation Number</th>
                    <th>Doctor Name</th>
                    <th>Specialization</th>
                    <th>Provide Feedback</th>
                    <th>Review Given</th>
                  </tr>
                </thead>
                <tbody>
                  {consultations.map((consultation, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{consultation.doctor.name}</td> {/* Corrected */}
                      <td>{consultation.doctor.speciality}</td> {/* Corrected */}
                      <td>
                        <button
                          onClick={() => handleProvideFeedback(consultation)}
                          className="feedback-button"
                          disabled={consultation.appointments[0].feedbackSubmitted}
                        >
                          {consultation.appointments[0].feedbackSubmitted ? 'Submitted' : 'Click Here'}
                        </button>
                      </td>
                      <td>{consultation.appointments[0].review || ''}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <GiveReviews
              consultation={selectedConsultation}
              onSubmit={handleReviewSubmit}
            />
          )}
        </>
      )}
    </>
  );
};

export default ReviewForm;
