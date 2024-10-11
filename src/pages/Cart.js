import { useEffect, useState } from "react";
import { FaRegTrashCan } from "react-icons/fa6";

export const Cart = () => {
    const [products, setProducts] = useState([]);

    // Retrieve userId from localStorage
    const user = JSON.parse(localStorage.getItem('user')); // Get user object from localStorage
    const userId = user ? user.userId : null; // Extract userId from user object

    useEffect(() => {
        if (userId) {
            // Load products from sessionStorage specific to the user
            const savedCart = JSON.parse(sessionStorage.getItem(`cart_${userId}`)) || [];
            const initializedProducts = savedCart.map(product => ({
                ...product,
                subtotal: product.quantity * product.price,
            }));
            setProducts(initializedProducts);
        }
    }, [userId]);

    // Handle quantity change and recalculate subtotal
    const handleQuantityChange = (index, newQuantity) => {
        const updatedProducts = products.map((product, i) => {
            if (i === index) {
                const updatedProduct = {
                    ...product,
                    quantity: newQuantity,
                    subtotal: newQuantity * product.price,
                };
                return updatedProduct;
            }
            return product;
        });
        setProducts(updatedProducts);
        sessionStorage.setItem(`cart_${userId}`, JSON.stringify(updatedProducts)); // Save cart for the user
    };

    // Calculate the total price of all products in the cart
    const calculateGrandTotal = () => {
        return products.reduce((acc, product) => acc + (product.subtotal || 0), 0).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    };

    // Remove a product from the cart
    const handleRemoveProduct = (index) => {
        const updatedProducts = products.filter((_, i) => i !== index);
        setProducts(updatedProducts);
        sessionStorage.setItem(`cart_${userId}`, JSON.stringify(updatedProducts)); // Update cart
    };

    return (
        <div className="container mx-auto h-[500px] my-[50px]">
            <h2 className="font-bold text-primary row text-[30px] my-[20px]">Check Out</h2>
            <div className="flex justify-between">
                <table className="table-auto w-full text-left border-separate border-spacing-y-4">
                    <thead>
                        <tr className="text-left">
                            <th className="font-semibold w-2/5">Products</th>
                            <th className="font-semibold w-1/6 text-center">Price</th>
                            <th className="font-semibold w-1/6 text-center">Quantity</th>
                            <th className="font-semibold w-1/6 text-center">Subtotal</th>
                            <th className="w-1/12"></th>
                        </tr>
                    </thead>
                    <tbody className="list-product">
                        {products.map((product, index) => (
                            <tr key={index} className="">
                                <td className="flex items-center space-x-4">
                                    <img src={product.img} alt={product.title} className="object-cover h-[80px]" />
                                    <div>{product.title}</div>
                                </td>
                                <td className="text-center">{product.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                                <td className="text-center">
                                    <div className="flex justify-center">
                                        <div className="items-center justify-center border border-[#131118] px-2 rounded-lg">
                                            {/* Decrease quantity */}
                                            <button
                                                onClick={() =>
                                                    handleQuantityChange(index, Math.max(1, product.quantity - 1))
                                                }
                                                className="px-2 rounded-l text-[27px]"
                                            >
                                                -
                                            </button>
                                            {/* Display quantity */}
                                            <span className="text-[17px]">{product.quantity}</span>
                                            {/* Increase quantity */}
                                            <button
                                                onClick={() => handleQuantityChange(index, product.quantity + 1)}
                                                className="px-2 rounded-r text-[22px]"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                </td>
                                <td className="text-center">{product.subtotal.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                                <td className="text-center">
                                    <FaRegTrashCan
                                        className="cursor-pointer text-red-500"
                                        onClick={() => handleRemoveProduct(index)}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="border-2 border-[#ECEBED] w-[350px]">
                    <div className="p-[20px]">
                        <h3 className="border-b font-bold pb-3">Order summary</h3>
                        <div className="flex justify-between py-5">
                            <div className="font-semibold">Grand Total</div>
                            <div className="font-semibold">{calculateGrandTotal()}</div>
                        </div>
                        <div>
                            <button className="text-white rounded-lg p-[18px] bg-primary w-full">
                                Proceed to CheckOut
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
