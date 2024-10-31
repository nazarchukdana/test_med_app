import React, { useState } from 'react';
import './GiveReviews.css';
import StarRating from './StarRating';

function GiveReviews({ consultation, onSubmit }) {
  const [formData, setFormData] = useState({
    doctorName: consultation.doctor.name, // Add doctor name here
    review: '',
    rating: 0,
    id: consultation.id, // Set the consultation ID
  });
  const [showWarning, setShowWarning] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.review && formData.rating > 0) {
      setShowWarning(false);
      onSubmit(formData); // Submit the review data to parent (ReviewForm)
      setFormData({ ...formData, review: '', rating: 0 }); // Clear the form after submission
    } else {
      setShowWarning(true); // Show warning if fields are empty
    }
  };

  const handleRatingChange = (newRating) => {
    setFormData({ ...formData, rating: newRating });
  };

  return (
    <div className="give-review-container">
      <h2>Provide Feedback</h2>
      <form onSubmit={handleSubmit}>
        {showWarning && <p className="warning">Please fill out all fields.</p>}
        <div>
          <label htmlFor="review">Review:</label>
          <textarea
            className="input"
            id="review"
            name="review"
            value={formData.review}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Rating:</label>
          <StarRating rating={formData.rating} onRatingChange={handleRatingChange} />
        </div>
        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
}

export default GiveReviews;
