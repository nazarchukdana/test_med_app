import React, { useState } from 'react';
import GiveReviews from './GiveReviews/GiveReviews';
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
  const [selectedConsultation, setSelectedConsultation] = useState(null);

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
  };

  return (
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
  );
};

export default ReviewForm;