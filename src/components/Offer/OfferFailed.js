import React, { useEffect, useState } from "react";
import { OfferPendingMadeServices } from "../../services/OfferYouMadeServices";
import { Link } from 'react-router-dom';
import { OfferPendingRecievedServices } from "../../services/OfferYouRecievedServices";
import ConfirmationModal from "../Popup/ConfirmationModal";
import { DeleteOfferServices } from "../../services/DeleteOfferServices";

export const OfferFailed = ({ status }) => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOfferId, setSelectedOfferId] = useState(null); // Track which offer to delete

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        setLoading(true);
        let response;
        if (status === "make") {
          response = await OfferPendingMadeServices("cancle");
        } else if (status === "receive") {
          response = await OfferPendingRecievedServices("cancle");
        }
        setOffers(response);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
  }, [status]);

  const handleDelete = (orderId) => {
    setSelectedOfferId(orderId); // Set the selected offer ID
    setIsModalOpen(true); // Open the confirmation modal
  };

  const confirmDelete = async () => {
    try {
      await DeleteOfferServices(selectedOfferId); // Use selectedOfferId to delete the offer
      setOffers(offers.filter(offer => offer.orderId !== selectedOfferId)); // Update the offers state
    } catch (err) {
      console.error("Error deleting offer:", err);
    } finally {
      setIsModalOpen(false); // Close the modal after confirmation
      setSelectedOfferId(null); // Reset selected offer ID
    }
  };

  const cancelDelete = () => {
    setIsModalOpen(false); // Close the modal without deleting
    setSelectedOfferId(null); // Reset selected offer ID
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error fetching offers: {error.message}</div>;
  }

  return (
    <div>
      {offers.length === 0 ? (
        <div>No offers available.</div>
      ) : (
        offers.map((offer) => (
          <div key={offer.orderId} className="w-full rounded-xl border-2 py-6 px-2 border-primary mb-4 flex my-[40px]">
            <div className="w-2/5 justify-center flex items-center">
              <img
                src={offer.orderDetails[0].product.images[0].path}
                alt="Product"
                className="w-3/5 h-48 object-cover rounded-lg"
              />
            </div>
            <div className="w-2/5">
              <h2 className="font-bold text-[25px]">{offer.orderDetails[0].product.productName}</h2>
              <div className="my-[20px]">{offer.type === "exchange" 
                ? `Số lượng yêu cầu trao đổi: ${offer.orderDetails[0].quantity}` 
                : `Số lượng yêu cầu mua: ${offer.orderDetails[0].quantity}`}</div>
              <div className="my-[20px] font-semibold">Trạng thái giao dịch: {offer.type === "exchange" ? "Trao đổi" : "Mua"}</div>
              {offer.type === "exchange" && (
                <Link className="flex items-center">
                  <div className="flex items-center">
                    <img src={offer.orderDetails[0].productTrade.images[0].path} alt="Trade Product" className="w-16 h-16 mr-[20px]" />
                    <div className="text-[16px] text-gray-500">{offer.orderDetails[0].productTrade.productName}</div>
                  </div>
                </Link>
              )}
            </div>

            <div className="w-1/5 flex flex-col justify-center mr-[30px]">
              <button className="border p-3 bg-primary rounded-lg text-white read-only">Giao dịch thất bại</button>
              <button 
                className="border p-3 bg-red-600 text-white rounded-lg mt-5" 
                onClick={() => handleDelete(offer.orderId)} // Call handleDelete with the orderId
              >
                Xóa giao dịch
              </button>
            </div>
          </div>
        ))
      )}

      <ConfirmationModal
        isVisible={isModalOpen} 
        onConfirm={confirmDelete} 
        onCancel={cancelDelete} 
        message="Bạn có chắc chắn muốn xóa giao dịch này?" 
      />
    </div>
  );
};
