import React, { useEffect, useState } from "react";
import axios from "axios";
import { OfferPendingMadeServices } from "../../services/OfferYouMadeServices";
import { useNavigate } from 'react-router-dom';  // Import useNavigate for navigation
import { OfferPendingRecievedServices } from "../../services/OfferYouRecievedServices";
import { OfferUpdateServices } from "../../services/OfferUpdateServices";

export const OfferPending = ({ status }) => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();  // Initialize the navigate function
  const state = "pending";

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        setLoading(true);
        let response;
        if (status === "make") {
          response = await OfferPendingMadeServices(state);
        } else if (status === "receive") {
          response = await OfferPendingRecievedServices(state);
        }
        console.log(response)
        setOffers(response);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
  }, [status]);

  const handleReject = async (orderId) => {
    try {
      await OfferUpdateServices(orderId, "failed");
      setOffers((prevOffers) => prevOffers.filter((offer) => offer.orderId !== orderId));
    } catch (error) {
      console.error("Failed to reject offer:", error);
    }
  };

  const handleAccept = async (orderId) => {
    try {
      await OfferUpdateServices(orderId, "shiping");
      setOffers((prevOffers) => prevOffers.filter((offer) => offer.orderId !== orderId));
    } catch (error) {
      console.error("Failed to accept offer:", error);
    }
  };

  const handleContact = (sellerId) => {
    // Navigate to the chat page using the sellerId
    navigate(`/chat/${sellerId}`);
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
              <h2 className="font-bold text-[25px]">{offer.orderDetails[0].quantity} x  {offer.orderDetails[0].product.productName}</h2>
              <div className="my-[20px]">
                {offer.type === "exchange"
                  ? `Số lượng yêu cầu trao đổi: ${offer.orderDetails[0].quantity}`
                  : `Số lượng yêu cầu mua: ${offer.orderDetails[0].quantity}`}
              </div>
              <div className="my-[20px] font-semibold">
                Trạng thái giao dịch: {offer.type === "exchange" ? "Trao đổi" : "Mua"}
              </div>
              <div className="my-[20px] font-semibold flex">
                Tổng giá tiền :<div className="ml-2 text-red-600">{offer.total} đ</div>
              </div>

              {offer.type === "exchange" && (
                <div className="flex items-center">
                  <img
                    src={offer.orderDetails[0].productTrade.images[0].path}
                    alt="Trade Product"
                    className="w-16 h-16 mr-[20px]"
                  />
                  <div className="text-[16px] text-gray-500">
                    {offer.orderDetails[0].productTrade.productName}
                  </div>
                </div>
              )}
            </div>

            <div className="w-1/5 flex flex-col justify-center mr-[30px]">
              {status === "make" ? (
                <button
                  className="border p-3 bg-primary rounded-lg text-white my-[20px]"
                  onClick={() => handleContact(offer.sellerId)} // Trigger contact function
                >
                  Liên hệ
                </button>
              ) : (
                <>
                  <button
                    className="border p-3 bg-primary rounded-lg text-white my-[20px]"
                    onClick={() => handleAccept(offer.orderId)} // Trigger accept function
                  >
                    Chấp nhận
                  </button>
                 
                </>
              )}
               <button
                    className="border p-3 bg-primary rounded-lg text-white"
                    onClick={() => handleReject(offer.orderId)} // Trigger reject function
                  >
                    Từ chối
                  </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};
