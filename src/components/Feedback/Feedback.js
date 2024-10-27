import React, { useState, useRef, useEffect } from 'react';
import StarRatings from 'react-star-ratings';
import { FaEllipsisV } from 'react-icons/fa';
import { RatingProduct } from './RatingProduct'; // Import the RatingProduct component
import { DeleteFeedbackServices } from '../../services/FeedBackServices';
import ConfirmationModal from '../Popup/ConfirmationModal';


export const FeedBack = ({ reviews, productImg, productName }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [rating, setRating] = useState(0);
  const [openMenuIndex, setOpenMenuIndex] = useState(null); // To track the open menu by review index
  const [editingReview, setEditingReview] = useState(null); // To track the review being edited
  const [isModalVisible, setIsModalVisible] = useState(false); // Modal visibility state
  const [feedbackToDelete, setFeedbackToDelete] = useState(null); // Track which feedback to delete
  const menuRef = useRef(null);

  // Close the menu when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenuIndex(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Open modal for confirmation before deleting
  const confirmDelete = (feedbackId) => {
    setFeedbackToDelete(feedbackId); // Set the feedback to delete
    setIsModalVisible(true); // Show the confirmation modal
  };

  // Handle the confirmed deletion
  const handleDelete = async () => {
    try {
      const response = await DeleteFeedbackServices(feedbackToDelete);
      if (response.success) {
        console.log(`Feedback with ID: ${feedbackToDelete} deleted successfully`);
        // Optionally, remove the deleted review from the UI
        setIsModalVisible(false); // Close the modal
      }
    } catch (error) {
      console.error('Error deleting feedback:', error);
    }
  };

  const toggleMenu = (index) => {
    setOpenMenuIndex(openMenuIndex === index ? null : index); // Toggle menu open/close
  };

  return (
    <div className='App'>
      {reviews.map((review, index) => (
        <div key={index} className="review-item border-b pb-4 mb-4">
          <div className="flex justify-between items-center">
            <span className="font-bold">{review.sender.userName}</span>
            <div className='flex '>
              <span className="text-sm mr-2 text-gray-500">
                {new Date(review.createdAt).toLocaleDateString()}
              </span>
              {user?.userId === review.sender.userId && (
                <div className="relative" ref={menuRef}>
                  <button
                    className="text-gray-600 hover:text-gray-800"
                    onClick={() => toggleMenu(index)}
                  >
                    <FaEllipsisV />
                  </button>
                  {openMenuIndex === index && (
                    <div className="absolute right-0 mt-2 w-32 bg-white border rounded-lg shadow-lg">
                      <button
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                        onClick={() => confirmDelete(review.feedbackId)} // Trigger confirmation modal
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          <p className="text-gray-700 mb-2">{review.description}</p>

          <StarRatings
            rating={parseFloat(review.rating)}  // Ensure rating is a float value
            starRatedColor="yellow"
            numberOfStars={5}
            name={`rating-${index}`}
            starDimension="20px"
            starSpacing="3px"
            isHalf={true} // Enable half stars
          />
        </div>
      ))}

      {/* Render RatingProduct when editingReview is set */}
      {editingReview && (
        <RatingProduct
          productName={productName}
          productImg={productImg}
          initialDescription={editingReview.description} // Passing as initialDescription
          initialRating={editingReview.rating} // Passing as initialRating
          status="edit"
        />
      )}

      {/* Confirmation Modal */}
      <ConfirmationModal
        isVisible={isModalVisible}
        onConfirm={handleDelete} // Confirm delete action
        onCancel={() => setIsModalVisible(false)} // Cancel and close modal
        message="Bạn có chắc chắn muốn xóa phản hồi này không?"
      />
    </div>
  );
};
