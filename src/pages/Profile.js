import React, { useEffect, useState } from 'react';
import { Sider } from '../components/sider/Sider';
import { ChangePassword } from '../components/Profile/ChangePassword';
import { ProfileInfor } from '../components/Profile/ProfileInfor';
import { UpradeAccount } from '../components/Profile/UpradeAccount';
import { ReportHistory } from '../components/ReportHistory';
import { useSearchParams } from 'react-router-dom';

export const Profile = () => {
  // Initialize searchParams using useSearchParams
  const [searchParams] = useSearchParams();
  
  // Set the default active section
  const [activeSection, setActiveSection] = useState('profileInfo');

  useEffect(() => {
    // Get the section from the search params
    const section = searchParams.get("section") || 'profileInfo';
    setActiveSection(section);
  }, [searchParams]);

  // Handlers for toggling sections
  const handleToggleProfileInfo = () => {
    setActiveSection('profileInfo');
  };

  const handleToggleChangePassword = () => {
    setActiveSection('changePassword');
  };

  const handleToggleUpgradeAccount = () => {
    setActiveSection('upgradeAccount');
  };

  const handleToggleReportHistory = () => {
    setActiveSection('reportHistory');
  };

  return (
    <div className="container mx-auto my-[150px]">
      <div className="flex">
        <div className="w-auto">
          <Sider 
            activeSection={activeSection} 
            onToggleProfileInfo={handleToggleProfileInfo} 
            onToggleChangePassword={handleToggleChangePassword} 
            onToggleUpgradeAccount={handleToggleUpgradeAccount} 
            onToggleReport={handleToggleReportHistory}
          />
        </div>
        <div className="flex-1 ml-[20px]">
          <main className="mb-[120px]">
            {activeSection === 'profileInfo' && <ProfileInfor />}
            {activeSection === 'changePassword' && <ChangePassword />} 
            {activeSection === 'upgradeAccount' && <UpradeAccount />} 
            {activeSection === 'reportHistory' && <ReportHistory />}
          </main>
        </div>
      </div>
    </div>
  );
};
