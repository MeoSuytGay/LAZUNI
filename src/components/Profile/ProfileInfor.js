import React, { useEffect, useState } from 'react';
import { FaEdit } from "react-icons/fa";
import { LuFileEdit } from "react-icons/lu";
import axios from 'axios';

import AvatarImage from '../../assets/images/avatar-default.jpg';

import { ChangeInformationService } from '../../services/ChangeInformationServices';
import { InputField } from '../Authenfication/InputField';
import '../../assets/css/style.css';

export const ProfileInfor = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNum, setPhoneNum] = useState('');
    const [address, setAddress] = useState(''); // Nhập địa chỉ nhà cụ thể
    const [email, setEmail] = useState('');
    const [user, setUser] = useState(null);
    const [image, setImage] = useState(AvatarImage);
    const [selectedFile, setSelectedFile] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);

    const [cities, setCities] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            const nameParts = parsedUser.userName.split(' ');
            setUser(parsedUser);
            setImage(parsedUser.profilePicture || AvatarImage);
            setFirstName(nameParts[0] || '');
            setLastName(nameParts.slice(1).join(' ') || '');
            setPhoneNum(parsedUser.phoneNum || '');
            setEmail(parsedUser.email || '');
    
            // Split address into specific address, district, and city
            const addressParts = parsedUser.address ? parsedUser.address.split(',') : [];
            setAddress(addressParts[0]?.trim() || ''); // Địa chỉ cụ thể
            setSelectedCity(addressParts[2]?.trim() || ''); // Thành phố
        
            setSelectedDistrict(addressParts[1]?.trim() || ''); // Quận huyện
        }
    
        // Fetch cities data on component mount
        axios.get("https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json")
            .then(response => {
                setCities(response.data);
            })
            .catch(error => {
                console.error("Error fetching cities:", error);
            });
    }, []);
    

    // Handle city selection
    const handleCityChange = (e) => {
        const cityName = e.target.value;
        setSelectedCity(cityName);
    
        const selectedCityData = cities.find(city => city.Name === cityName);
        if (selectedCityData) {
            setDistricts(selectedCityData.Districts);
        } else {
            setDistricts([]);
        }
        setSelectedDistrict(''); // Reset district sel  ection
    };

    const handleDistrictChange = (e) => {
        setSelectedDistrict(e.target.value);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            setImage(URL.createObjectURL(file));
        }
    };

    const triggerFileInput = () => {
        document.getElementById('image-upload').click();
    };

    const updateProfile = async () => {
        const formData = new FormData();  // Initialize formData here
        formData.append('username', firstName + " " + lastName);
        formData.append('phoneNum', phoneNum);
        formData.append('address', `${address}, ${selectedDistrict}, ${selectedCity}`);
        formData.append('email', email);
        if (selectedFile) {
            formData.append('avatar', selectedFile);
            
        }
       
        else{
            formData.append('avatar', AvatarImage);
        }
    
        try {
            
            const response = await ChangeInformationService(formData);
            console.log('Profile updated successfully', response);
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };
  
    

    return (
        <>
            <form className='mx-auto ml-[30px] mr-[50px]' onSubmit={(e) => e.preventDefault()}>
                <div className='flex justify-between'>
                    <div>
                        <a
                            href="#"
                            title="User Profile"
                            className="flex space-x-2 relative"
                        >
                            <img
                                className="w-[100px] h-[100px] rounded-full object-cover cursor-pointer"
                                src={image}
                                alt="Profile"
                                onClick={triggerFileInput}
                            />
                            <FaEdit className='absolute top-[60px] left-[60px] text-[20px]' />
                        </a>

                        <input
                            type="file"
                            id="image-upload"
                            accept="image/*"
                            
                            onChange={handleImageChange}
                            className="hidden"
                        />
                    </div>
                    <div className='flex items-center'>
                        <div className='font-[700px] text-[18px]'>
                            Enable edit
                        </div>
                        <label className="switch ml-5">
                            <input type="checkbox"
                                checked={isEditMode}
                                onChange={(e) => setIsEditMode(e.target.checked)} />
                            <span className="slider round"></span>
                        </label>
                    </div>
                </div>

                <div className='mt-[20px]'>
                    <div className='mt-[20px]'>
                        <div className='flex'>
                            <div className='mr-[50px] w-1/2'>
                                <InputField
                                    title="First Name"
                                    type="text"
                                    id="FirstName"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    readOnly={!isEditMode}
                                />
                            </div>
                            <div className='w-1/2'>
                                <InputField
                                    title="Last Name"
                                    type="text"
                                    id="LastName"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    readOnly={!isEditMode}
                                />
                            </div>
                        </div>

                        <div className='flex'>
                            <div className='mr-[50px] w-1/2'>
                                <InputField
                                    title="Phone Number"
                                    type="number"
                                    id="PhoneNum"
                                    value={phoneNum}
                                    onChange={(e) => setPhoneNum(e.target.value)}
                                    readOnly={!isEditMode}
                                />
                            </div>
                            <div className='w-1/2'>
                                <InputField
                                    readOnly={true}
                                    title="Email Address"
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className='flex flex-col md:flex-row my-[5px]'>
                            <div className='mr-[50px] w-full md:w-1/2'>
                                <label className='text-[16px]  mb-2' htmlFor="city">Tỉnh Thành:</label>
                                <select
                                    id="city"
                                    value={selectedCity}
                                    onChange={handleCityChange}
                                    className={`form-control w-full p-[16px] border border-primary rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${!isEditMode ? 'bg-gray-200 cursor-not-allowed' : 'bg-white'}`}
                                    disabled={!isEditMode}
                                >
                                    <option value="">Chọn Tỉnh Thành</option>
                                    {cities.map((city) => (
                                        <option key={city.Id} value={city.Name}>{city.Name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className='w-full md:w-1/2'>
                                <label className='text-[16px] mb-2' htmlFor="district">Quận Huyện:</label>
                                <select
                                    id="district"
                                    value={selectedDistrict}
                                    onChange={handleDistrictChange}
                                    className={`form-control w-full p-[16px] border border-primary rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${!isEditMode || !selectedCity ? 'bg-gray-200 cursor-not-allowed' : 'bg-white'}`}
                                    disabled={!isEditMode || !selectedCity}
                                >
                                    <option value="">Chọn Quận/Huyện</option>
                                    {districts.map((district) => (
                                        <option key={district.Id} value={district.Name}>{district.Name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className='flex my-[15px]'>
                            <div className=' w-full '>
                                <InputField
                                    title="Địa chỉ cụ thể"
                                    type="text"
                                    id="Address"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    readOnly={!isEditMode}
                                />
                            </div>
                        </div>

                        

                      
                    </div>
                </div>

                {isEditMode && (
                    <div >
                        <button
                            className='flex items-center bg-primary text-white p-4 rounded-lg w-[135px] mt-[15px]'
                            onClick={updateProfile}
                        >
                            <LuFileEdit />
                            <div className='ml-[10px]'>
                                Save Edit
                            </div>
                        </button>
                    </div>
                )}
            </form>
        </>
    );
};
