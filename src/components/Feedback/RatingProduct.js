import React, { useState, useCallback } from 'react';
import ReactStars from "react-rating-stars-component";
import { CreateFeedbackServices } from '../../services/FeedBackServices';

export const RatingProduct = ({ productName, productImg, initialDescription = '', initialRating = 0, status, productId, receiveId }) => {
  const [rating, setRating] = useState(initialRating);
  const [description, setDescription] = useState(initialDescription);
  const user = JSON.parse(localStorage.getItem("user")); // Parse user info from local storage
  
  const handleRating = useCallback((rate) => {
    setRating(rate);
    console.log('Rating:', rate);
  }, []);

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload or re-render
    
    // Create feedback data object
    const data = {
      senderId: user?.userId,
      receiverId: receiveId,
      productId: productId,
      rating: rating,
      description: description,
    };

    try {
      if (description) {
        console.log('Submitting feedback:', data);
        // Call CreateFeedbackServices to send the data
        await CreateFeedbackServices(data);
      } else {
        console.error('Description is required for submitting feedback');
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center justify-between border-b border-t py-4">
      {/* Left column: Product Image and Name */}
      <div className="w-1/4 flex flex-col items-center">
        <img src={productImg} alt={productName} className="w-32 h-32 object-cover mb-2" />
        <div className="font-bold">{productName}</div>
      </div>

      {/* Middle column: Rating and Description */}
      <div className="w-2/4 flex flex-col items-center">
        <div className="mb-4">
          <ReactStars
            count={5}
            onChange={handleRating}
            size={24}
            isHalf={true}
            emptyIcon={<i className="far fa-star"></i>}
            halfIcon={<i className="fa fa-star-half-alt"></i>}
            fullIcon={<i className="fa fa-star"></i>}
            activeColor="#ffd700"
            value={rating}
          />
        </div>
        <input
          type="text"
          value={description}
          onChange={handleDescriptionChange}
          placeholder="Điền đánh giá của bạn"
          className="input-class border p-2 rounded w-full ml-0 md:ml-10"
        />
      </div>

      {/* Right column: Submit Button */}
      <div className="w-1/4 flex justify-end">
        <button type="submit" className="btn border px-6 py-2 rounded-lg bg-primary text-white">
          Đánh giá
        </button>
      </div>
    </form>
  );
};