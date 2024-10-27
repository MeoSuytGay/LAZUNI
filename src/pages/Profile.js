import React, { useEffect, useState } from 'react';
import { Sider } from '../components/sider/Sider';
import { ChangePassword } from '../components/Profile/ChangePassword';
import { ProfileInfor } from '../components/Profile/ProfileInfor';
import { UpgradeAccount, UpradeAccount } from '../components/Profile/UpradeAccount';
import { ReportHistory } from '../components/Profile/ReportHistory';
import { useSearchParams } from 'react-router-dom';
import { BlanceFlucation } from '../components/Profile/BlanceFlucation';
import { ViewSatic } from '../components/Profile/ViewStatic';

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

  const handleBlanceFlucation = () => {
    setActiveSection('blanceFlucation');
  };

  const handleToggleViewStatic = () => {
    setActiveSection('viewStatic');
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
            onToggleReportHistory={handleToggleReportHistory} 
            onToggleBlanceFlucation={handleBlanceFlucation}  
            onToggleViewStatic={handleToggleViewStatic}  
          />
        </div>
        <div className="flex-1 ml-[20px]">
          <main className="mb-[120px]">
            {activeSection === 'profileInfo' && <ProfileInfor />}
            {activeSection === 'changePassword' && <ChangePassword />} 
            {activeSection === 'upgradeAccount' && <UpgradeAccount />} 
            {activeSection === 'reportHistory' && <ReportHistory />}
            {activeSection === 'blanceFlucation' && <BlanceFlucation />}
            {activeSection === 'viewStatic' && <ViewSatic />} 
          </main>
        </div>
      </div>
    </div>
  );
};
