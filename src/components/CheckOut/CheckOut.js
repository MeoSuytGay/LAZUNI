import React from "react";
import { AddressCheckOut } from "./AddressCheckOut";
export const CheckOut = ({ products = [] }) => {
  return (
    <>
      <div className="bg-[#F5F5F5] min-h-screen">
        <div className="mx-auto container mt-[20px]">
          {/* Address Section */}
          <div className="w-full bg-white mt-[20px] p-4 rounded-lg">
            {/* Placeholder for Address */}
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
                  <tr key={index} className="border-b border-gray-200">
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
          <div className="w-full bg-white mt-[40px]  flex items-center">
            <div>Tổng số tiền :</div>
                <div className=""></div>
          </div>

  {/* Method payment */}
        <div className="w-full bg-white mt-[40px]  ">
          <div className="border-b flex items-center justify-between">
          <div >Phương Thức Thanh Toán</div>
          <div>
            <button className="px-4 py-2  border-[#F5F5F5] text-black hover:text-">Ví Lazuni</button>
            <button className="px-4 py-2 border-[#F5F5F5] text-black">Thanh toán khi nhận hàng</button>
          </div>
            </div>
            <div className="flex flex-col border-b">
              <div className=""></div>
              <div className=""></div>
              <div className=""></div>
            </div>
            <div className="flex items-center justify-between">
                   <div>Nhấn "Đặt hàng " đồng nghĩa bạn đã chấp hành chính sách của <strong>LAZUNI</strong></div>
                   <button className="">Đặt hàng</button>
            </div>
          
        </div>





        </div>
      </div>
    </>
  );
};
