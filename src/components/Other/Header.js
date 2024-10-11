import logoImage from '../../assets/images/logo.png';
import AvatarImage from '../../assets/images/avatar-default.jpg';
import React, { useEffect, useState } from 'react';
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { IoCartOutline } from "react-icons/io5";
import { RiProductHuntLine } from "react-icons/ri";
import { FiShoppingBag } from "react-icons/fi";
import { FaSearch } from "react-icons/fa";
import { CiMenuBurger, CiWallet } from "react-icons/ci";
import { Link, useNavigate } from 'react-router-dom';
import LogoutModal from '../Popup/LogoutModal';
import DepositMoney from '../Popup/DespositeMoney';

export const Header = () => {
    const [keyWord, setKeyWord] = useState('');
    const [user, setUser] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [showDepositModal, setShowDepositModal] = useState(false); // Add state for deposit modal

    const handleDepositClick = () => {
        setShowDepositModal(true); // Show the deposit modal
    };
    const navigate = useNavigate();

    const handleLogout = () => {
        setShowLogoutModal(true);
    };

    const confirmLogout = () => {
        localStorage.removeItem('user');
        window.location.href = '/login';
    };

    const cancelLogout = () => {
        setShowLogoutModal(false);
    };

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (keyWord) {
            navigate(`/products?keyword=${keyWord}&page=1`);
        } else {
            navigate(`/products?page=1`);
        }
    };

    const handleProfileNavigation = (section) => {
        setShowDropdown(false); // Close dropdown after selecting
        navigate(`/profile?section=${section}`);
    };
    return (
        <>
            <header className="pb-6 bg-white lg:pb-0 ">
                <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 flex justify-between items-center mt-[10px]">
                    {/* Logo */}
                    <div className="flex-shrink-0 mr-1">
                        <a href="/" title="" className="flex">
                            <img className="w-auto h-8 lg:h-10" src={logoImage} alt="Logo" />
                        </a>
                    </div>

                    {/* Search Bar with Icon */}
                    <form className="search relative w-full max-w-md mr-2 mt-[5px]" onSubmit={handleSearchSubmit}>
                        <input
                            type="text"
                            placeholder="Search for products..."
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary"
                            value={keyWord}
                            onChange={(e) => setKeyWord(e.target.value)}
                        />
                        <button type="submit">
                            <FaSearch className="absolute right-3 top-3 text-gray-500" />
                        </button>
                    </form>

                    {/* Icons */}
                    <div className="flex h-auto items-center space-x-6">
                        <Link to="#">
                            <IoChatboxEllipsesOutline size={24} className="hover:text-stone-600" />
                        </Link>
                        <Link to="/Cart">
                            <IoCartOutline size={24} className="hover:text-stone-600" />
                        </Link>
                        <Link to="#">
                            <FiShoppingBag size={24} className="hover:text-stone-600" />
                        </Link>
                        <Link to="/manageproducts" className="flex items-center space-x-2">
                            <RiProductHuntLine size={24} className="hover:text-stone-600" />
                            <a className="text-base font-medium">Manage Products</a>
                        </Link>
                    </div>

                    {/* Profile or Login */}
                    <div className='ml-[15px]'>
                        {user ? (
                            <div className="relative flex">
                                <div className="flex items-center space-x-2 mr-6 border rounded-lg p-2">
                                    <a className="text-base font-medium" onClick={handleDepositClick}>+ {user.balance}</a>
                                    <CiWallet size={24} className="hover:text-stone-600" />
                                </div>
                                <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setShowDropdown(!showDropdown)}>
                                    <img
                                        className="w-8 h-8 rounded-full object-cover"
                                        src={user.profilePicture || AvatarImage}
                                        alt="Profile"
                                    />
                                    <span className="text-base font-medium text-black">{user.userName}</span>
                                </div>

                                {/* Dropdown Menu */}
                                {showDropdown && (
                                    <div className="absolute right-0 mt-12 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                                        {/* Profile Information Section */}
                                        <div className="px-4 py-2">
                                            <div className="font-semibold">Profile Information</div>
                                            <button
                                                onClick={() => handleProfileNavigation('profileInfo')}
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                            >
                                                View Profile
                                            </button>
                                            <button
                                                onClick={() => handleProfileNavigation('changePassword')}
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                            >
                                                Change Password
                                            </button>
                                        </div>

                                        {/* Account Section */}
                                        <div className="px-4 py-2">
                                            <div className="font-semibold">Account</div>
                                            <button
                                                onClick={() => handleProfileNavigation('upgradeAccount')}
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                            >
                                                Upgrade Account
                                            </button>
                                        </div>

                                        {/* Report Section */}
                                        <div className="px-4 py-2">
                                            <div className="font-semibold">Report</div>
                                            <button
                                                onClick={() => handleProfileNavigation('reportHistory')}
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                            >
                                                Report History
                                            </button>
                                        </div>

                                        {/* Statistical Section */}
                                        <div className="px-4 py-2">
                                            <div className="font-semibold">Statistical</div>
                                            <button
                                                onClick={() => handleProfileNavigation('blanceFlucation')}
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                            >
                                                View Balance Fluctuation
                                            </button>
                                            <button
                                                onClick={() => handleProfileNavigation('viewStatic')}
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                            >
                                                View Statistics
                                            </button>
                                        </div>

                                        {/* Other Section */}
                                        <div className="px-4 py-2">
                                            <div className="font-semibold">Other</div>
                                            <button
                                                onClick={handleLogout}
                                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            >
                                                Log Out
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <a
                                href="/login"
                                className="px-6 py-2 text-base font-medium text-white bg-primary border border-primary rounded-lg hover:bg-slate-500"
                            >
                                Login
                            </a>
                        )}
                    </div>
                </div>
            </header>

            <LogoutModal
                isOpen={showLogoutModal}
                onClose={cancelLogout}
                onConfirm={confirmLogout}
            />
            <DepositMoney
                isOpen={showDepositModal}
                onClose={() => setShowDepositModal(false)} // Close the deposit modal
            />
        </>
    );
};
