import { HeaderAuth } from '../components/Authenfication/HeaderAuth';
import { InputField } from '../components/Authenfication/InputField';
import loginImage from '../assets/images/img_login.svg';
import { LoginServices } from '../services/LoginServices';
import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPopup, setShowPopup] = useState(false); // State for popup visibility
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const user = await LoginServices(email, password);
           

            if (user.state === "active") {
                localStorage.setItem('user', JSON.stringify(user));
                localStorage.setItem('email', user.email);
                navigate('/');
            } else {
                setShowPopup(true); // Show popup if user account is not active
            }
        } catch (err) {
            alert('Invalid email or password. Please try again.');
        }
    };

    return (
        <>
            <div className="flex w-auto box-border">
                <div className="w-[845px] h-[1024px]">
                    <img src={loginImage} className="object-cover w-full" alt="Login" />
                </div>
                <div className="ml-[110px] mt-[311px] w-auto">
                    <HeaderAuth title="Welcome 👋 " desc="Please login here" />
                    <div className="">
                        <form className="w-[445px]" onSubmit={handleLogin}>
                            <div className="mb-1 flex flex-col">
                                <InputField
                                    title="Email Address"
                                    type="email"
                                    id="email"
                                    content="robertfox@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)} // Capture email input
                                />

                                <InputField
                                    title="Password"
                                    type="password"
                                    id="password"
                                    content="••••••••••••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)} // Capture password input
                                />
                                <div className="flex flex-wrap justify-between mb-[30px] items-center">
                                    <div className="items-center flex">
                                        <input type="checkbox" className="mr-[16px] w-[20px] h-[20px] accent-primary" name="persist" id="persist" />
                                        <label className="text-[16px] font-normal text-primary" htmlFor="persist">Remember Me</label>
                                    </div>
                                    <div className="">
                                        <a href="/forgetPassword" className="block text-primary text-[14px] font-normal mb-1">Forgot password?</a>
                                    </div>
                                </div>

                                <button className="mb-[20px] w-full p-[20px] border border-primary bg-primary text-white rounded-lg">
                                    Login
                                </button>
                                <a href="/signUp" className="block text-primary text-[18px] font-normal">New? Sign up here!</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* Popup Modal for Locked Account */}
            {showPopup && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                        <h2 className="text-xl font-semibold mb-4">Account Locked</h2>
                        <p className="mb-4">Your account has been locked. Please contact support for assistance.</p>
                        <button
                            onClick={() => setShowPopup(false)}
                            className="px-4 py-2 bg-primary text-white rounded"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};
