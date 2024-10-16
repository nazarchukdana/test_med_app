import React, { useState } from 'react';
import './GiveReviews.css';
import StarRating from './StarRating';
  
// Function component for giving reviews
function GiveReviews({ consultation, onSubmit }) {
  // State variables using useState hook
  const [formData, setFormData] = useState({
    name: '',
    review: '',
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
    if (formData.review && formData.name && formData.rating > 0) {
      setShowWarning(false);
      onSubmit(formData); // Submit the review data to parent (ReviewForm)
    } else {
      setShowWarning(true); // Show warning if fields are empty
    }
    setFormData({
      name: '',
      review: '',
      rating: 0
    });
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
            <label htmlFor="name">Name:</label>
            <input classname="input" type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
          </div>
        <div>
          <label htmlFor="review">Review:</label>
          <textarea classname="input"
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