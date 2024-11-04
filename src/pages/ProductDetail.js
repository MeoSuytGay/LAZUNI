import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProductDetailServices } from "../services/ProductDetailServices";
import { FaTags } from "react-icons/fa";
import { MdOutlineLocalShipping } from "react-icons/md";
import { TbFreeRights } from "react-icons/tb";
import { AiOutlineSafety } from "react-icons/ai";
import { IoCartOutline } from "react-icons/io5";
import { PiHandshake } from "react-icons/pi";
import { FaHandHolding } from "react-icons/fa";
import { Link } from "react-router-dom";
import { CiChat1 } from "react-icons/ci";
import { CiShop } from "react-icons/ci";
import { FeedBack } from "../components/Feedback/Feedback";
import { MdOutlineReport } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import ConfirmPurchasePopup from '../components/Popup/Confirm';
import ReportPopup from "../components/Popup/ReportProduct";
import { ListProductByUserIdServices } from "../services/ListProductByUserIdServices";
import { BuyProductServices } from "../services/PaymentByServices";
import NotificationModal from "../components/Popup/Notice";
import { createNotification } from "../services/NoficationServices";
export const ProductDetail = () => {
    const { productId } = useParams();
    const [productDetail, setProductDetail] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [showExchangeList, setShowExchangeList] = useState(false);
    const [selectedProductIds, setSelectedProductIds] = useState([]); // Track multiple selected products
    const [isReportPopupOpen, setReportPopupOpen] = useState(false);
    const [isConfirmPopupOpen, setConfirmPopupOpen] = useState(false);
    const [exchangeProducts, setExchangeProducts] = useState([]);
    const user = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate();
    const [notification, setNotification] = useState({ show: false, message: '', success: false });
    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const data = await ProductDetailServices(productId);
                setProductDetail(data);
                const userProducts = await ListProductByUserIdServices(user.userId, "public"); 
                setExchangeProducts(userProducts);
                console.log(productDetail)
            } catch (error) {
                setError("Failed to load product details.");
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchProductDetails();
    }, [productId]);

    const closeNotification = () => {
        setNotification({ show: false, message: '', success: false });
      };

    const increaseQuantity = () => {
        if (quantity < productDetail.quantity) {
            setQuantity(quantity + 1);
        }
    };
    const openReportPopup = () => {
        setReportPopupOpen(true);
    };

    const closeReportPopup = () => {
        setReportPopupOpen(false);
    };
    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };



    const toggleProductSelection = (id) => {
        setSelectedProductIds((prevIds) =>
            prevIds.includes(id) ? prevIds.filter((pid) => pid !== id) : [...prevIds, id]
        );
    };

    const confirmExchange = () => {
        // Filter selected products from the exchangeProducts array
        const selectedProducts = exchangeProducts.filter((item) => selectedProductIds.includes(item.productId));
    
        if (selectedProducts.length > 0) {
            // If there are selected products, pass them to handleTradeSubmit
            handleTradeSubmit(selectedProducts);
        } else {
            alert("No product selected for exchange.");
        }
    
        // Reset selection and hide the exchange list
        setSelectedProductIds([]);
        setShowExchangeList(false);
    };
    
    const handleTradeSubmit = async (selectedProducts) => {
        try {
            const buyerId = user.userId; // Retrieve from user data
    
            // Create orders for each selected product
            const orders = selectedProducts.map((product) => ({
                type: "exchange", // Indicate that this is a trade/exchange order
                sellerId: productDetail.user.userId, // Assuming the seller's user ID is part of the product details
                buyerId: buyerId,
                paymentBy: "COD",
                orderDetails: [
                    {
                        productId: productDetail.productId,
                        quantity: 1,
                        productTradeId: product.productId, // Add trade ID if applicable
                    }
                ],
                total:0
            }));
    
            // Call the BuyProductServices function to place the orders
            const result = await BuyProductServices(orders); // Ensure we await the result
           
            if(result==="Order has been created"){

                setNotification({ show: true, message: "Bạn đã trao đổi sản phẩm thành công", success: true });
      
        
             
                await createNotification(
                    productDetail.user.userId,             // sellerId (senderId in notification)
                  user.userId,                // buyerId (recipientId in notification)
                  user.userName,              // senderName
                  `Bạn đã yêu cầu trao đổi sản phẩm ${productDetail.productName}  vui lòng đợi người bán phản hồi!`, 
                  "Giao dịch sản phẩm",       // title
                  false                       // isRead
                );
                await createNotification(
                  user.userId,              // sellerId (senderId in notification)
                  productDetail.user.userId,               // buyerId (recipientId in notification)
                  user.userName,              // senderName
                  `Bạn có yêu cầu trao đổi sản phẩm  ${productDetail.productName} từ ${user.userName} !`, 
                  "Giao dịch sản phẩm",       // title
                  false                       // isRead
                );
              
              }
              else{
                
      setNotification({ show: true, message: "Bạn không thể trao đổi sản phẩm!", success: false });
      
              }


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
    



    const toggleExchangeList = () => {
        setShowExchangeList(!showExchangeList);
    };
    const handleBuyNow = () => {
        setConfirmPopupOpen(true);
    };
    const confirmPurchase = () => {
        const Products = {
            id: productDetail.productId,
            title: productDetail.productName,
            img: productDetail.images[0].path,
            price: productDetail.price,
            subtotal: productDetail.price * quantity, // Calculate subtotal based on quantity
            quantity: quantity,
            sellID: productDetail.user.userId
        };

        // Redirect to the checkout page with the product details as an array
        navigate('/checkout', {
            state: {
                products: [Products] // Pass the product as an array
            }
        });
    };

    const handleAddToCart = () => {
        const productToAdd = {
            id: productDetail.productId,
            title: productDetail.productName,
            img: productDetail.images[0].path,
            price: productDetail.price,
            quantity: quantity,
            sellID: productDetail.user.userId
        };

        const user = JSON.parse(localStorage.getItem('user'));
        const userId = user ? user.userId : 'guest'; // Use 'guest' if no user is logged in

        const existingCart = JSON.parse(sessionStorage.getItem(`cart_${userId}`)) || [];

        const productIndex = existingCart.findIndex(item => item.id === productDetail.id);

        if (productIndex !== -1) {
            // If the product exists, update its quantity
            existingCart[productIndex].quantity += quantity;
        } else {
            // If the product doesn't exist, add it to the cart
            existingCart.push(productToAdd);
        }

        // Save the updated cart to sessionStorage
        sessionStorage.setItem(`cart_${userId}`, JSON.stringify(existingCart));

        // Show a success message
        alert("Added to cart successfully!");
    };



    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }


    return (
        <>
            {productDetail ? (
                <div className="container mx-auto  mt-[50px]">
                    <div className="border flex p-2  border-[5px]h-auto">
                        <div className="w-2/5 flex  justify-center">
                            <div className="h-[350px] text-center ">
                                <img src={productDetail.images[0].path} className="object-contain h-full max-w-full" alt={productDetail.productName} />

                                {/* <div className="mt-4">
                                   <Carousel  slides={productDetail.images}/>
                                    </div> */}
                            </div>
                        </div>
                        <div className="w-3/5">
                            <div className="font-semibold text-[24px] flex items-center justify-between">{productDetail.productName} <div className="w-1/12 cursor-pointer mt-[4px]" onClick={(e) => {
                                e.preventDefault(); // Prevent default action
                                openReportPopup();
                            }}>
                                <MdOutlineReport />
                            </div></div>
                            <div className="flex items-center uppercase my-[8px]"><FaTags /> <div className="mx-4">{productDetail.category.title}</div></div>
                            <div className="bg-[#FAFAFA]">
                                <div className="p-4 text-red-500 ml-[25px] text-[25px] font-medium">đ {productDetail.price}</div>
                            </div>
                            <div className="flex my-5">
                                <div className="w-1/6 text-[#757575]">Vận chuyển</div>
                                <div className="w-5/6 flex flex-col justify-start my-[8px] ml-[10px]">
                                    <div className="text-[#757575] flex items-center"><AiOutlineSafety className="text-[24px] mr-[10px]" />Đơn hàng sẽ được giao bởi người bán để giam thiểu kinh phí sản phẩm</div>
                                    <div className=" text-[#757575] flex items-center my-[10px]"><TbFreeRights className="text-[24px] mr-[10px]" />Miễn phí vận chuyển</div>
                                    <div className="text-[#757575] flex items-center"> <MdOutlineLocalShipping className="text-[24px] mr-[10px]" /> Vận chuyển tới {user.address}</div>
                                </div>
                            </div>
                            <div className="flex my-7">
                                <div className="w-1/6 text-[#757575]">Số lượng</div>
                                <div className="w-5/6 flex items-center ml-[10px] ">
                                    <button onClick={decreaseQuantity} className="px-3 py-1 border hover:bg-gray-300 rounded-l">-</button>
                                    <div className="text-[#757575] mx-2">{quantity}</div>
                                    <button onClick={increaseQuantity} className="px-3 py-1 border hover:bg-gray-300 rounded-r">+</button>
                                    <div className="text-[#757575] ml-2">{productDetail.quantity} sản phẩm có sẵn</div>
                                </div>

                            </div>
                            <div className=" my-7">
                                {/* Conditionally render buttons based on product type */}
                                <div className="flex items-center">

                                    {productDetail.type === 'sell' || productDetail.type === 'both' ? (
                                        <>
                                            <button onClick={handleBuyNow} className="mr-10 border p-4 w-auto flex bg-primary text-white">
                                                <FaHandHolding className="mr-4 text-[18px]" />Mua ngay
                                            </button>
                                            <ConfirmPurchasePopup
                                                isOpen={isConfirmPopupOpen}
                                                onClose={() => setConfirmPopupOpen(false)}
                                                onConfirm={confirmPurchase}
                                            />
                                            <button
                                                className="border p-4 w-auto flex items-center bg-primary text-white"
                                                onClick={handleAddToCart} // Call the function when the button is clicked
                                            >
                                                <IoCartOutline className="mr-2 text-[18px]" />
                                                Thêm vào giỏ hàng
                                            </button>
                                        </>
                                    ) : null}
                                </div>
                                {productDetail.type === 'both' ? (
                                    <div className="my-2">
                                        <div className="my-3">OR</div>

                                    </div>
                                ) : null}

                                {productDetail.type === 'exchange' || productDetail.type === 'both' ? (
                                    <>
                                        <button onClick={toggleExchangeList} className="border p-4 w-auto flex items-center my-7 bg-primary text-white">
                                            <PiHandshake className="mr-2 text-[18px]" /> Trao đổi ngay
                                        </button>
                                        {showExchangeList && (
                                            <div className="my-5 border rounded p-4">
                                                <div className="font-semibold text-lg mb-2">Chọn sản phẩm để trao đổi:</div>
                                                <div className="grid grid-cols-2 *:gap-4">
                                                    {exchangeProducts.map((item) => (
                                                        <div
                                                            key={item.productId}
                                                            className={`border p-2 flex items-center cursor-pointer ${selectedProductIds.includes(item.productId) ? 'bg-gray-200' : ''}`}
                                                            onClick={() => toggleProductSelection(item.productId)} // Toggle selection
                                                        >
                                                            <img src={item.images[0].path} alt={item.productName} className="w-12 h-12 object-cover" />
                                                            <div className="mx-2 text-[10px]">{item.productName}</div>
                                                            <div className="text-red-500">đ{item.price}</div>
                                                        </div>
                                                    ))}
                                                </div>
                                                <button onClick={confirmExchange} className="mt-4 border p-3 bg-primary text-white">Xác nhận</button>
                                            </div>
                                        )}


                                    </>
                                ) : null}
                            </div>



                        </div>
                    </div>
                    <div className="my-10">
                        <div className="text-[26px]  p-3 font-semibold bg-[#FAFAFA]">Mô tả sản phẩm</div>
                        <div className="my-4">{productDetail.description}</div>

                    </div>
                    <div className="my-10 flex ">
                        <div className="w-2/3">
                            <div className="text-[26px]  p-3 font-semibold bg-[#FAFAFA]">Đánh giá</div>
                            <div className="my-[25px]">
                                <FeedBack reviews={productDetail.feedBacks} productImg={productDetail.images[0].path} productName={productDetail.productName} />

                            </div>

                        </div>
                        <div className="w-1/3">
                            <div className="flex ml-[30px] mr-[50px] my-[20px] space-x-2 items-center ">
                                <Link to={`/shop/${productDetail.user.userId}`}>
                                    <img
                                        className="w-[100px] h-[100px] rounded-full object-cover w-2/5 cursor-pointer"
                                        src={productDetail.user.profilePicture}
                                        alt="Profile"
                                    />
                                </Link>
                                <div>
                                    <strong className="text-base font-[700px] text-primary">{productDetail.user.userName}</strong>
                                    <div className="flex mt-2">
                                        <button className="flex items-center border p-2 mr-2">
                                            <CiChat1 className="mr-1" />
                                            <div className="text-[12px]">Nhắn tin ngay</div>
                                        </button>
                                        <button className="flex items-center border p-2">
                                            <CiShop className="mr-1" />
                                            <div className="text-[12px]">Xem shopg</div>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            ) : (
                <div>Product not found</div>
            )}
            <ReportPopup isOpen={isReportPopupOpen} onClose={closeReportPopup} />
            <NotificationModal
        show={notification.show}
        message={notification.message}
        success={notification.success}
        onClose={closeNotification}
      />
        </>
    );



};
