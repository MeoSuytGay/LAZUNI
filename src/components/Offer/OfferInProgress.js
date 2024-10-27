import React, { useEffect, useState } from "react";
import { OfferPendingMadeServices } from "../../services/OfferYouMadeServices";
import { OfferPendingRecievedServices } from "../../services/OfferYouRecievedServices";
import { ProducDeliveryByMade } from "./ProductDeliveryByMade";
import { ProductDeliverByRecived } from "./ProductDeliveryByRecieved";
import { ProductDeliveryByMadeTrade } from "./ProductDeliveryByMadeTrade";

export const OfferInProgress = ({ status }) => {
  const [offers, setOffers] = useState([]); // Local state to hold fetched offers
  const [loading, setLoading] = useState(true); // Loading state to manage API call status
  const [error, setError] = useState(null); // Error state for handling errors
  const state = "shiping"; // Set state to "shiping" for filtering

  // Fetch the offers when the component loads or status changes
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
        console.log('API Response:', response);
        setOffers(response);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
  }, [status]);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error fetching offers: {error.message}</div>;
  }

  // Group offers into one data structure
  const groupedOffers = offers.reduce((acc, offer) => {
    if (status === "receive") {
      acc.received.push(offer);
    } else if (status === "make") {
      if (offer.type === "exchange") {
        acc.exchanged.push(offer);
      } else {
        acc.regular.push(offer);
      }
    }
    return acc;
  }, { received: [], exchanged: [], regular: [] });

  // Render the appropriate component based on grouped offers
  return (
    <div>
      {offers.length === 0 ? (
        <div>No offers in progress.</div>
      ) : (
        <>
          {status === "receive" && groupedOffers.received.map((offer) => (
            <ProducDeliveryByMade key={offer.orderId} data={offer} />
          ))}
          {status === "make" && (
            <>
              {groupedOffers.exchanged.map((offer) => (
                <ProductDeliveryByMadeTrade key={offer.orderId} data={offer} />
              ))}
              {groupedOffers.regular.map((offer) => (
                <ProductDeliverByRecived key={offer.orderId} data={offer} />
              ))}
            </>
          )}
        </>
      )}
    </div>
  );
};
