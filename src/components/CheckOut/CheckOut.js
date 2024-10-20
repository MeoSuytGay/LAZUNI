import React, { useEffect, useState } from "react";
import { AddressCheckOut } from "./AddressCheckOut";
import { TiTick } from "react-icons/ti";
import { useLocation } from "react-router-dom";
import { BuyProductServices } from "../../services/PaymentByServices";

export const CheckOut = () => {
  const [walletBalance, setWalletBalance] = useState(0); // Renamed from shippingFee to walletBalance
  const [paymentMethod, setPaymentMethod] = useState("COD"); // Default payment method is Cash on Delivery
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("COD"); // Default selected payment method is Cash on Delivery
  const location = useLocation(); // Use this to get the state passed during navigation
  const [products, setProducts] = useState([]);
  const [balanceError, setBalanceError] = useState(false); // State to track if balance is insufficient
  const user = JSON.parse(localStorage.getItem('user'))
  useEffect(() => {
    if (location.state && location.state.products) {
      setProducts(location.state.products); // Set products from location state
      console.log("Products:", location.state.products); // Check if products are passed
    } else {
      console.log("No products data passed to CheckOut");
    }

    // Set default wallet balance for "COD"
    if (paymentMethod === "COD") {
      setWalletBalance(0);
    }
  }, [location, paymentMethod]);

  // Function to calculate total product price
  const totalProductPrice = products.reduce(
    (acc, product) => acc + product.subtotal,
    0
  );

  // Function to handle payment method change
  const handlePaymentMethod = (method) => {
    if (method === "Lazuni") {
      // Check if user balance is enough for Ví Lazuni
      const user = JSON.parse(localStorage.getItem("user"));
      if (user && user.balance >= totalProductPrice) {
        setPaymentMethod(method);
        setSelectedPaymentMethod(method); // Update the selected method with a checkmark
        setBalanceError(false); // Reset error if balance is sufficient
        setWalletBalance(Number(user.balance)); // Set wallet balance to user's balance if using Ví Lazuni
      } else {
        // If balance is insufficient, show error and don't change method
        setBalanceError(true);
        return;
      }
    } else if (method === "COD") {
      // Set wallet balance to 0 if using Cash on Delivery
      setPaymentMethod(method);
      setSelectedPaymentMethod(method);
      setBalanceError(false); // Reset error for COD
      setWalletBalance(0);
    }
  };
  const handleOrderSubmit = async () => {
    try {
      const buyerId = user.userId; // Retrieve from user data
      const groupedProducts = products.reduce((acc, product) => {
        const sellerId = product.sellID;
        if (!acc[sellerId]) {
          acc[sellerId] = [];
        }
        acc[sellerId].push(product);
        return acc;
      }, {});
  
      // Create the orders based on grouped products
      const orders = Object.keys(groupedProducts).map((sellerId) => ({
        type: "buy",
        sellerId: sellerId,
        buyerId: buyerId,
        paymentBy: paymentMethod,
        orderDetails: groupedProducts[sellerId].map((product) => ({
          productId: product.id,
          quantity: product.quantity,
          productTradeId: "", 
        }))
      }));
  
      // Call the BuyProductServices function to place the orders
      const result = await BuyProductServices(orders); // Ensure we await the result
  
      // Handle the result
      if (result.error) {
        console.error("Order submission failed:", result.error);
      } else {
        console.log("Order submitted successfully:", result);
      }
    } catch (error) {
      // Handle any errors that occur during order submission
      console.error("An error occurred while submitting the order:", error.message);
    }
  };
  
  

  return (
    <>
      <div className="bg-[#F5F5F5] min-h-screen">
        <div className="mx-auto container mt-[20px] ">
          {/* Address Section */}
          <div className="w-full bg-white mt-[20px] p-4 rounded-lg">
            <AddressCheckOut />
          </div>

          {/* Product Table */}
          <div className="w-full bg-white mt-[40px] p-4 rounded-lg">
            <div className="text-lg font-bold mb-4">Sản phẩm</div>
            <table className="table-auto w-full text-left border-separate border-spacing-y-4">
              <thead>
                <tr className="text-left">
                  <th className="font-semibold w-2/5">Sản phẩm</th>
                  <th className="font-semibold w-1/6 text-center">Đơn giá</th>
                  <th className="font-semibold w-1/6 text-center">Số lượng</th>
                  <th className="font-semibold w-1/6 text-center">Thành tiền</th>
                </tr>
              </thead>
              <tbody className="list-product">
                {products.map((product, index) => (
                  <tr key={product.id} className="border-b border-gray-200">
                    <td className="flex items-center space-x-4 mt-[25px]">
                      <img
                        src={product.img}
                        alt={product.title}
                        className="object-cover h-[80px] w-[80px] rounded"
                      />
                      <div className="flex flex-col">
                        <div>{product.title}</div>
                      </div>
                    </td>
                    <td className="text-center">
                      {product.price.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </td>
                    <td className="text-center">{product.quantity}</td>
                    <td className="text-center">
                      {product.subtotal.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Sum price */}
          <div className="w-full bg-white mt-[40px] p-4 flex justify-between">
            <div className="text-lg font-bold">Tổng số tiền :</div>
            <div className="text-lg font-bold">
              {totalProductPrice.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </div>
          </div>

          {/* Method payment */}
          <div className="w-full bg-white mt-[40px] p-4">
            <div className="border-b flex items-center justify-between mb-4">
              <div className="font-semibold my-[10px]">Phương Thức Thanh Toán</div>
              <div className="my-[10px]">
                <button
                  className={`px-4 py-2 mr-2 border border-black text-black  ${selectedPaymentMethod === "Lazuni" ? "bg-orange-500 text-white border-[#FAFAFA]" : "hover:bg-[#F5F5F5] hover:scale-x-90 "}`}
                  onClick={() => handlePaymentMethod("Lazuni")}
                >
                  <div className="flex items-center">
                    {selectedPaymentMethod === "Lazuni" ? (
                      <TiTick className="mr-2 text-red-800 text-[20px]" />
                    ) : (
                      ""
                    )}
                    Ví Lazuni
                  </div>
                </button>
                <button
                  className={`px-4 py-2 border border-black text-black   ${selectedPaymentMethod === "COD" ? "bg-orange-500 text-white border-[#FAFAFA]" : "hover:bg-[#F5F5F5] hover:scale-x-90"}`}
                  onClick={() => handlePaymentMethod("COD")}
                >
                  <div className="flex items-center">
                    {selectedPaymentMethod === "COD" ? (
                      <TiTick className="mr-2 text-red-800 text-[20px]" />
                    ) : (
                      ""
                    )}
                    Thanh toán khi nhận hàng
                  </div>
                </button>
              </div>
            </div>
            {balanceError && (
              <div className="text-red-500 mb-4">Số dư trong ví không đủ để thanh toán!</div>
            )}
            <div className="flex flex-col mb-4">
              <div className="flex justify-between">
                <span>Tổng tiền hàng:</span>
                <span>{totalProductPrice.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}</span>
              </div>
              <div className="flex justify-between">
                <span>Tài khoản hiện có:</span>
                <span>
                  {paymentMethod === "Lazuni" ? walletBalance.toLocaleString("vi-VN", { style: "currency", currency: "VND" }) : "0"}
                </span>
              </div>
              <div className="flex justify-between font-bold">
                <span>Tổng thanh toán:</span>
                <span>  
                  {((totalProductPrice - walletBalance) < 0 ? 0 : totalProductPrice).toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                Nhấn "Đặt hàng" đồng nghĩa bạn đã chấp hành chính sách của <strong>LAZUNI</strong>
              </div>
              <button
               onClick={() => handleOrderSubmit("Lazuni")}
                className="px-6 py-2 bg-orange-500 text-white rounded-lg"
              >
                Đặt hàng
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
