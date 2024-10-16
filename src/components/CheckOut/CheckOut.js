import React, { useEffect, useState } from "react";
import { AddressCheckOut } from "./AddressCheckOut";
import { TiTick } from "react-icons/ti";
import { useLocation } from "react-router-dom";

export const CheckOut = () => {
  const [shippingFee, setShippingFee] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("COD"); // Default payment method is Cash on Delivery
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("COD"); // Default selected payment method is Cash on Delivery
  const location = useLocation(); // Use this to get the state passed during navigation
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (location.state && location.state.products) {
      setProducts(location.state.products); // Set products from location state
      console.log("Products:", location.state.products); // Check if products are passed
    } else {
      console.log("No products data passed to CheckOut");
    }

    // Set default shipping fee for "COD"
    if (paymentMethod === "COD") {
      setShippingFee(0);
    }
  }, [location, paymentMethod]);

  // Function to calculate total product price
  const totalProductPrice = products.reduce(
    (acc, product) => acc + product.subtotal,
    0
  );

  // Function to handle payment method change
  const handlePaymentMethod = (method) => {
    setPaymentMethod(method);
    setSelectedPaymentMethod(method); // Update the selected method with a checkmark
    if (method === "Lazuni") {
      // Set shipping fee to user's balance if using Ví Lazuni
      const user = JSON.parse(localStorage.getItem("user"));
      if (user && user.balance) {
        setShippingFee(Number(user.balance));
      }
    } else if (method === "COD") {
      // Set shipping fee to 0 if using Cash on Delivery
      setShippingFee(0);
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
            <div className="flex flex-col mb-4">
              <div className="flex justify-between">
                <span>Tổng tiền hàng:</span>
                <span>{totalProductPrice.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}</span>
              </div>
              <div className="flex justify-between">
                <span>Tài khoản hiện có:</span>
                <span>
                  {paymentMethod === "Lazuni" ? shippingFee.toLocaleString("vi-VN", { style: "currency", currency: "VND" }) : "0"}
                </span>
              </div>
              <div className="flex justify-between font-bold">
                <span>Tổng thanh toán:</span>
                <span>
                  {(shippingFee - totalProductPrice).toLocaleString("vi-VN", {
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
