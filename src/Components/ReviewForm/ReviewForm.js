import React, { useState, useEffect } from 'react';
import GiveReviews from './GiveReviews/GiveReviews';
import './ReviewForm.css'; // Optional: For custom styles

// Sample data (can be passed as props or fetched from an API)


const ReviewForm = () => {
  // State to hold consultations data
  const [consultations, setConsultations] = useState([]);
  const [selectedConsultation, setSelectedConsultation] = useState(null);
const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  // Load consultations from localStorage for the logged-in user
  const mergeAppointments = (appointments1, appointments2) => {
    const merged = [...appointments1]; // Start with all appointments from first list

    // Iterate through second list of appointments
    appointments2.forEach(appointment2 => {
      const existing = merged.find(appointment1 => appointment1.doctor.name === appointment2.doctor.name);

      if (existing) {
        // If the doctor already exists in merged list, combine the appointments
        existing.appointments = [
          ...existing.appointments,
          ...appointment2.appointments, // Add new appointments to the existing ones
        ];
      } else {
        // If doctor not found, add it to the merged list
        merged.push(appointment2);
      }
    });

    return merged;
  };

  // Load consultations from localStorage for the logged-in user
  const loadConsultationsFromStorage = () => {
    const storedAppointments = JSON.parse(localStorage.getItem('allAppointments')) || [];
    const storedAppointmentsIC = JSON.parse(localStorage.getItem('allAppointmentsIC')) || [];
    const storedUsername = sessionStorage.getItem('email'); // Assuming email is stored in sessionStorage

    if (storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);

      // Filter appointments based on logged-in user
      const userAppointments = storedAppointments.filter(appointment => appointment.user === storedUsername);
      const userAppointmentsIC = storedAppointmentsIC.filter(appointment => appointment.user === storedUsername);

      // Transform appointments into the desired format (doctorName, specialization)
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

      // Merge appointments from both sources based on the doctor
      const mergedConsultations = mergeAppointments(transformedAppointments, transformedAppointmentsIC);

      setConsultations(mergedConsultations);
    } else {
      setIsLoggedIn(false);
    }
  };
  // Load consultations when the component is first mounted
  useEffect(() => {
    loadConsultationsFromStorage();

    // Listen for changes in localStorage
    const handleStorageChange = () => {
      loadConsultationsFromStorage(); // Re-fetch consultations when data changes
    };

    // Add event listener for the storage event
    window.addEventListener('storage', handleStorageChange);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);
  // Handler to provide feedback
  const handleProvideFeedback = (consultation) => {
    setSelectedConsultation(consultation);
  };

  // Handler to submit the review and update the consultations table
  const handleReviewSubmit = (reviewData) => {
    // Update the consultation with the provided review
    setConsultations((prevConsultations) =>
      prevConsultations.map((consultation) =>
        consultation.id === reviewData.id
          ? { ...consultation, review: reviewData.review, feedbackSubmitted: true }
          : consultation
      )
    );
    // Close the review form after submission
    setSelectedConsultation(null);

    // Update the review in localStorage
    let allAppointments = JSON.parse(localStorage.getItem('allAppointments')) || [];
    let allAppointmentsIC = JSON.parse(localStorage.getItem('allAppointmentsIC')) || [];

    // Update the review in both allAppointments and allAppointmentsIC
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

    // Save updated appointments
    localStorage.setItem('allAppointments', JSON.stringify(allAppointments));
    localStorage.setItem('allAppointmentsIC', JSON.stringify(allAppointmentsIC));
  };

  return (
    <>{!isLoggedIn ? (
        <div>Please log in to view your consultations.</div>
      ) : (
        <>
   
      {/* Render consultation table */}
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
              <tr key={consultation.id}>
                <td>{index + 1}</td>
                <td>{consultation.doctorName}</td>
                <td>{consultation.specialization}</td>
                <td>
                  <button
                    onClick={() => handleProvideFeedback(consultation)}
                    className="feedback-button"
                    disabled={consultation.feedbackSubmitted}
                  >
                    {consultation.feedbackSubmitted ? 'Submitted' : 'Click Here'}
                  </button>
                </td>
                <td>{consultation.review || ''}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      ) : (
        // Render GiveReviews component for the selected consultation
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