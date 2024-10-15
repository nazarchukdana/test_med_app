import React, { useState } from 'react';
import './GiveReviews.css';

// Function component for giving reviews
function GiveReviews({ consultation, onSubmit }) {
  // State variables using useState hook
  const [formData, setFormData] = useState({
    name: consultation.doctorName,
    review: consultation.review || '',
    rating: 0,
    id: consultation.id,
  });
  const [showWarning, setShowWarning] = useState(false);

  // Function to handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.review && formData.rating > 0) {
      setShowWarning(false);
      onSubmit(formData); // Submit the review data to parent (ReviewForm)
    } else {
      setShowWarning(true); // Show warning if fields are empty
    }
  };

  return (
    <div>
      <h2>Provide Feedback for {consultation.doctorName}</h2>
      <form onSubmit={handleSubmit}>
        {showWarning && <p className="warning">Please fill out all fields.</p>}
        <div>
          <label htmlFor="review">Review:</label>
          <textarea
            id="review"
            name="review"
            value={formData.review}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="rating">Rating (1-5):</label>
          <input
            type="number"
            id="rating"
            name="rating"
            value={formData.rating}
            min="1"
            max="5"
            onChange={handleChange}
          />
        </div>
        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
}

export default GiveReviews;