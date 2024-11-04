import { GoDotFill } from "react-icons/go";
import { OfferUpdateServices } from "../../services/OfferUpdateServices"; // Import the service for updating offer
import { useState } from "react";
import NotificationModal from "../Popup/Notice";

export const ProductDeliveryByMadeTrade = (data) => {
  const [notification, setNotification] = useState({ show: false, message: '', success: false });

  const handleConfirm = async (orderId) => {
    try {
      // Update the offer status to 'done'
      const response = await OfferUpdateServices(orderId, "done");

      if (response === "Order has been successful") {
        setNotification({ show: true, message: "Nhận hàng thành công", success: true });


        // await createNotification(
        //   offer.seller.userId,
        //   offer.buyer.userId,
        //   offer.buyer.userName,
        //   `Yêu cầu giao dịch sản phẩm ${offer.orderDetails.product.productName} của bạn đã được duyệt!`,
        //   "Giao dịch sản phẩm",
        //   false
        // ).catch((error) => {
        //   console.error("Error creating notification:", error);
        // });


      } else {
        setNotification({ show: true, message: "Lỗi", success: false });
      }

    } catch (error) {
      console.error("Failed to update order status:", error);
    }
  };
  const closeNotification = () => {
    setNotification({ show: false, message: '', success: false });
  };

  return (
    <>
      <div key={data.orderId} className="w-full rounded-xl border-2 py-6 px-2 border-primary mb-4 my-[40px]">
        <div className="border-b border-gray-300 mb-[20px]">
          <div className="mx-[40px] mb-[20px]">
            <div className="text-[16px] flex items-center font-bold">
              <GoDotFill className="text-red-600" />
              Vui lòng giao hàng đến:
            </div>
            <ul>
              <li className="font-[400]">
                Địa chỉ người nhận: <strong>{data.data.seller.address}</strong>
              </li>
              <li className="font-[400]">
                Tên người nhận: <strong>{data.data.seller.userName}</strong>
              </li>
              <li className="font-[400]">
                Số điện thoại người nhận: <strong>{data.data.seller.phoneNum}</strong>
              </li>
            </ul>
          </div>
        </div>

        <div className="mb-[20px] mx-[40px]">
          <div className="font-bold text-[24px]">Thông tin đơn hàng</div>
          <div className="flex my-[20px] justify-between">
            <div className="flex text-center">
              <div>
                <img
                  src={data.data.orderDetails[0].productTrade.images[0].path}
                  alt="Product"
                  className="w-full h-10 object-cover rounded-lg"
                />
              </div>
              <div className="mx-2">{data.data.orderDetails[0].quantity} x</div>
              <div>{data.data.orderDetails[0].productTrade.productName}</div>
            </div>
            {data.data.total !== "0" && (
              <div className="font-bold">Tổng giá : {data.data.total}</div>
            )}
          </div>

          <div className="flex my-[20px] justify-between mt-[10px] text-center">
            <div className="font-semibold">
              Vui lòng bấm xác nhận hàng khi đã <strong>trao đổi hàng thành công</strong>
            </div>
            <button
              className="p-4 text-white bg-primary rounded-lg"
              onClick={() => handleConfirm(data.data.orderId)} // Call handleConfirm when clicked
            >
              Xác nhận
            </button>
          </div>
        </div>
      </div>
      <NotificationModal
        show={notification.show}
        message={notification.message}
        success={notification.success}
        onClose={closeNotification}
      />
    </>
  );
};
