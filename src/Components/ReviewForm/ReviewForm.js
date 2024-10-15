import React, { useState } from 'react';
import './ReviewForm.css'; // Optional: For custom styles

// Sample data (can be passed as props or fetched from an API)
const consultationData = [
  {
    id: 1,
    doctorName: 'Dr. John Smith',
    specialization: 'Cardiologist',
    review: '',
  },
  {
    id: 2,
    doctorName: 'Dr. Emily Johnson',
    specialization: 'Dermatologist',
    review: '',
  },
  {
    id: 3,
    doctorName: 'Dr. Michael Brown',
    specialization: 'Orthopedic',
    review: '',
  },
];

const ReviewForm = () => {
  // State to hold consultations data
  const [consultations, setConsultations] = useState(consultationData);

  // Handler to provide feedback
  const handleProvideFeedback = (id) => {
    const newReview = prompt("Please provide your feedback:");
    if (newReview) {
      setConsultations((prevConsultations) =>
        prevConsultations.map((consultation) =>
          consultation.id === id
            ? { ...consultation, review: newReview }
            : consultation
        )
      );
    }
  };

  return (
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
                  onClick={() => handleProvideFeedback(consultation.id)}
                  className="feedback-button"
                >
                  Provide Feedback
                </button>
              </td>
              <td>{consultation.review ? consultation.review : 'No review given'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReviewForm;