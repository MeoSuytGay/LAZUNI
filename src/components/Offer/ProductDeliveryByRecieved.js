import { GoDotFill } from "react-icons/go";
import { OfferUpdateServices } from "../../services/OfferUpdateServices"; // Import the service for updating offer

export const ProductDeliverByRecived = (data) => {
    
    // Function to handle confirmation when the user has received the product
    const handleConfirm = async (orderId) => {
        try {
            // Update the offer status to 'done'
            await OfferUpdateServices(orderId, "done");
            console.log(`Order ${orderId} status updated to done`);
            // You can add further actions here, such as showing a success message or redirecting
        } catch (error) {
            console.error("Failed to update order status:", error);
        }
    };

    return (
        <>
            <div key={data.orderId} className="w-full rounded-xl border-2 py-6 px-2 border-primary mb-4 my-[40px]">
                <div className="border-b border-gray-300 mb-[20px]">
                    <div className="flex items-center justify-center mb-[20px]">
                        <div className="w-3/5">
                            <div className="font-semibold text-[12px]">
                                Sản phẩm sẽ được giao chậm chất trong vòng 7 ngày
                            </div>
                            <div className="font-bold mt-[10px]">
                                {data.data.seller.userName} đang tiến hành chuẩn bị hàng vào giao đến cho bạn 
                            </div>
                        </div>
                        <div className="w-1/5">
                            <img
                                className="w-[100px] h-[100px] rounded-full object-cover cursor-pointer"
                                src={data.data.seller.profilePicture}
                                alt="Profile"
                            />
                        </div>
                    </div>
                </div>

                <div className="border-b border-gray-300 mb-[20px]">
                    <div className="mx-[40px] flex justify-between mb-[20px]">
                        <div className="">
                            <div className="text-[14px] flex items-center">
                                <GoDotFill className="text-green-500" /> Từ
                            </div>
                            <div className="font-semibold">{data.data.seller.address}</div>
                        </div>
                        <div className="">
                            <div className="text-[14px] flex items-center">
                                <GoDotFill className="text-red-600" /> Đến
                            </div>
                            <div className="font-semibold">
                                {data.data.buyer.address} - {data.data.buyer.userName}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mb-[20px] mx-[40px]">
                    <div className="font-bold text-[24px]">Thông tin đơn hàng</div>
                    <div className="flex my-[20px] justify-between">
                        <div className="flex text-center">
                            <img
                                src={data.data.orderDetails[0].product.images[0].path}
                                alt="Product"
                                className="w-12 h-12 object-cover rounded-lg"
                            />
                            <div className="mx-2">{data.data.orderDetails[0].quantity} x</div>
                            <div>{data.data.orderDetails[0].product.productName}</div>
                        </div>
                        <div className="font-bold">
                            Tổng giá : {data.data.total}
                        </div>
                    </div>

                    <div className="flex my-[20px] justify-between mt-[10px] text-center">
                        <div className="font-semibold">
                            Vui lòng bấm xác nhận hàng khi đã kiểm tra đơn hàng đã  <strong> nhận thành công</strong> 
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
        </>
    );
};
