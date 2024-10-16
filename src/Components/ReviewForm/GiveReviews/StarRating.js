import React, { useState } from 'react';

function StarRating({ rating, onRatingChange }) {
  const [hover, setHover] = useState(0);

  return (
    <div className="star-rating">
      {[...Array(5)].map((star, index) => {
        const ratingValue = index + 1;

        return (
          <label key={index}>
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => onRatingChange(ratingValue)}
              style={{ display: 'none' }} // Hide the radio button
            />
            <i
              className={`fa fa-star ${ratingValue <= (hover || rating) ? 'star-filled' : 'star-empty'}`}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(0)}
              style={{ cursor: 'pointer', fontSize: '24px' }} // Styling the stars
            />
          </label>
        );
      })}
    </div>
  );
}

export default StarRating;
