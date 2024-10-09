import React, { useState } from 'react';
import StarRatings from 'react-star-ratings';

export const FeedBack = ({ reviews }) => {
  // Set up state to hold the current rating
  const [rating, setRating] = useState(0);

  // Function to handle changing the rating
//   const changeRating = (newRating, name) => {
//     setRating(newRating); // Update the rating state
//   };

  return (
    <div className='App'>
      {reviews.map((review, index) => (
        <div key={index} className="review-item border-b pb-4 mb-4">
          <div className="flex justify-between items-center">
            <span className="font-bold">{review.sender.userName}</span>
            <span className="text-sm text-gray-500">{new Date(review.createdAt).toLocaleDateString()}</span>
          </div>
          <p className="text-gray-700 mb-2">{review.description}</p>
          
          {/* Display the current rating for each review */}
          <StarRatings
      
            rating={review.rating} // Display the rating from the review
            starRatedColor="yellow"
            // changeRating={changeRating} // Handle the rating change
            numberOfStars={5} // Number of stars to display
            name={`rating-${index}`} // Unique name for each rating
            starDimension="20px" // Size of the stars
            starSpacing="3px"
          />
        </div>
      ))}
    </div>
  );
};
