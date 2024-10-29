import React, { useEffect, useState } from 'react';
import { CiUser, CiHeart } from "react-icons/ci";
import { GrUpgrade } from "react-icons/gr";
import { IoSettingsOutline } from "react-icons/io5";
import { FaRegFileAlt } from "react-icons/fa";
import AvatarImage from '../../assets/images/avatar-default.jpg';
import { CiMoneyCheck1 } from "react-icons/ci";
import { FaHistory } from "react-icons/fa";
export const Sider = ({ 
  activeSection, 
  onToggleProfileInfo, 
  onToggleChangePassword, 
  onToggleUpgradeAccount,
  onToggleReportHistory,  // Changed name for consistency
  onToggleBlanceFlucation, // Added missing handler for balance fluctuation
  onToggleViewStatic // Added missing handler for ViewStatic
}) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className="border border-b-2 items-center">
      <a href="#" title="User Profile" className="flex ml-[30px] mr-[50px] my-[20px] space-x-2 items-center ">
        <img
          className="w-[50px] h-[50px] rounded-full object-cover"
          src={user?.profilePicture || AvatarImage}
          alt="Profile"
        />
        <strong className="text-base font-[700px] text-primary">{user?.userName || 'Guest'}</strong>
      </a>

      <div 
        className={`hover:bg-primary hover:text-white p-4 font-medium ${activeSection === 'profileInfo' ? 'bg-primary text-white' : ''}`} 
        onClick={onToggleProfileInfo}
      >
        <a href="#" className='flex items-center'>
          <div className='mr-[10px]'><CiUser /></div>
          <h2>Personal Information</h2>
        </a>
      </div>

      <div 
        className={`hover:bg-primary hover:text-white p-4 font-medium ${activeSection === 'changePassword' ? 'bg-primary text-white' : ''}`} 
        onClick={onToggleChangePassword}
      >
        <a href="#" className='flex items-center'>
          <div className='mr-[10px]'><IoSettingsOutline /></div>
          <h2>Change Password</h2>
        </a>
      </div>

      <div 
       className={`hover:bg-primary hover:text-white p-4 font-medium ${activeSection === 'upgradeAccount' ? 'bg-primary text-white' : ''}`} 
       onClick={onToggleUpgradeAccount}
      >
        <a href="#" className='flex items-center'>
          <div className='mr-[10px]'><GrUpgrade /></div>
          <h2>Upgrade Account</h2>
        </a>
      </div>
      
      <div 
       className={`hover:bg-primary hover:text-white p-4 font-medium ${activeSection === 'reportHistory' ? 'bg-primary text-white' : ''}`} 
       onClick={onToggleReportHistory}  // Updated to match the function name
      >
        <a href="#" className='flex items-center'>
          <div className='mr-[10px]'><FaHistory /></div>
          <h2>View Report History</h2>
        </a>
      </div>

      {/* New Section for Blance Fluctuation */}
      <div 
       className={`hover:bg-primary hover:text-white p-4 font-medium ${activeSection === 'blanceFlucation' ? 'bg-primary text-white' : ''}`} 
       onClick={onToggleBlanceFlucation}
      >
        <a href="#" className='flex items-center'>
          <div className='mr-[10px]'><CiMoneyCheck1 /></div>
          <h2>Balance Fluctuation</h2>
        </a>
      </div>

      {/* New Section for View Static */}
      {/* <div 
       className={`hover:bg-primary hover:text-white p-4 font-medium ${activeSection === 'viewStatic' ? 'bg-primary text-white' : ''}`} 
       onClick={onToggleViewStatic}
      >
        <a href="#" className='flex items-center'>
          <div className='mr-[10px]'><FaRegFileAlt /></div>
          <h2>View Static Data</h2>
        </a>
      </div> */}
    </div>
  );
};
