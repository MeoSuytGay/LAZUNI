import './App.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ForgetPassword } from './pages/ForgetPassword';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { HomePage } from './pages/HomePage';
import { Profile } from './pages/Profile';
import { EnterOtp } from './components/EnterOtp';
import { NewPassword } from './components/NewPassword';
import { Cart } from './pages/Cart';
import { ProductDetail } from './pages/ProductDetail';
import { ShopVendors } from './components/ShopVendors';
import { Products } from './pages/ProductsListing';
import { LayoutDefault } from './components/layouts/LayoutDefault';
import { UploadProduct } from './components/ManagementProduct/UploadProduct';
import { ManageProducts } from './pages/ManageProducts';
import { AdminPage } from './pages/AdminPage';
// import { DepositSuccessful } from './components/DepositSuccessful';
import { OfferPage } from './pages/OfferPage';
import { CheckOut } from './components/CheckOut/CheckOut';
import { EditProduct } from './components/ManagementProduct/EditProduct';
import ProtectedRoute from './components/ProtectedRoute';
import { Statistics } from './components/Admin/Statistics';

function App() {
    const user = JSON.parse(localStorage.getItem('user')); // Get user info from localStorage
    const userRole = user ? user.role : null; // Get user role

    return (
        <BrowserRouter>
            <Routes>
                <Route element={<LayoutDefault />}>
                    <Route path='/' element={<HomePage />} />
                    <Route path='profile' element={<Profile />} />
                    <Route path='newpassword' element={<NewPassword />} />
                    <Route path='cart' element={<Cart />} />
                    <Route path='products'>
                        <Route index element={<Products />} />
                        <Route path=":productId" element={<ProductDetail />} />
                    </Route>
                    <Route path="shop">
                        <Route index element={<HomePage />} />
                        <Route path=":userId" element={<ShopVendors />} /> 
                    </Route>
                    <Route path="edit-product">
                        <Route index element={<ManageProducts />} />
                        <Route path=":productId" element={<EditProduct />} /> 
                    </Route>
                    <Route path="manageproducts" element={<ManageProducts />} />
                    <Route path="offer" element={<OfferPage />} />
                    <Route path="checkout" element={<CheckOut />} />
                    <Route path="abc123" element={<Statistics />} />

                    {/* Use ProtectedRoute for admin page */}
                </Route>
                <Route path="login" element={<Login />} />
                <Route path="signUp" element={<Signup />} />
                <Route path="enterOtp" element={<EnterOtp />} />
                <Route path="forgetPassword" element={<ForgetPassword />} />
                {/* <Route path="depositSuccessful" element={<DepositSuccessful />} /> */}
                <Route path="uploadProduct" element={<UploadProduct />} />
                <Route 
                    path="adminpage" 
                    element={<ProtectedRoute element={<AdminPage />} userRole={userRole} requiredRole="admin" />} 
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
