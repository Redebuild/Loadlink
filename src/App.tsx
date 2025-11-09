import { useState } from 'react';
import { LanguageProvider } from './lib/LanguageContext';
import { EnhancedLanguageSelector } from './components/EnhancedLanguageSelector';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import { RoleSelector } from './components/RoleSelector';
import { RegistrationFlows } from './components/RegistrationFlows';
import { ShipperHome } from './components/ShipperHome';
import { TruckerHome } from './components/TruckerHome';
import { AgencyDashboard } from './components/AgencyDashboard';
import { CompanyDashboard } from './components/CompanyDashboard';
import { FleetOwnerDashboard } from './components/FleetOwnerDashboard';
import { PostLoadForm } from './components/PostLoadForm';
import { LiveBidding } from './components/LiveBidding';
import { GrievanceInsurance } from './components/GrievanceInsurance';
import { Settings } from './components/Settings';
import { ProMembership } from './components/ProMembership';
import { Sidebar } from './components/Sidebar';
import { SuccessModal } from './components/SuccessModal';

type Screen =
  | 'language'
  | 'roleSelection'
  | 'registration'
  | 'shipperHome'
  | 'truckerHome'
  | 'agencyDashboard'
  | 'companyDashboard'
  | 'fleetOwnerDashboard'
  | 'postLoad'
  | 'liveBidding'
  | 'grievance'
  | 'settings'
  | 'pro';

type Role = 'shipper' | 'trucker' | 'agency' | 'company' | 'fleetOwner' | null;

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('language');
  const [selectedRole, setSelectedRole] = useState<Role>(null);
  const [userData, setUserData] = useState<any>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [successModal, setSuccessModal] = useState({ isOpen: false, message: '' });
  const [currentLoadId, setCurrentLoadId] = useState('');

  const handleLanguageSelect = () => {
    setCurrentScreen('roleSelection');
  };

  const handleRoleSelect = (role: Role) => {
    setSelectedRole(role);
    setCurrentScreen('registration');
  };

  const handleRegistrationComplete = (data: any) => {
    setUserData(data);
    switch (data.role) {
      case 'shipper':
        setCurrentScreen('shipperHome');
        break;
      case 'trucker':
        setCurrentScreen('truckerHome');
        break;
      case 'agency':
        setCurrentScreen('agencyDashboard');
        break;
      case 'company':
        setCurrentScreen('companyDashboard');
        break;
      case 'fleetOwner':
        setCurrentScreen('fleetOwnerDashboard');
        break;
    }
  };

  const handlePostLoad = () => {
    setCurrentScreen('postLoad');
  };

  const handlePostLoadSubmit = () => {
    setSuccessModal({ isOpen: true, message: 'Load Posted Successfully!' });
    setTimeout(() => {
      setSuccessModal({ isOpen: false, message: '' });
      setCurrentScreen('shipperHome');
    }, 2000);
  };

  const handleViewBidding = (loadId: string) => {
    setCurrentLoadId(loadId);
    setCurrentScreen('liveBidding');
  };

  const handleSidebarNavigate = (page: string) => {
    switch (page) {
      case 'grievance':
      case 'insurance':
        setCurrentScreen('grievance');
        break;
      case 'settings':
        setCurrentScreen('settings');
        break;
      case 'pro':
        setCurrentScreen('pro');
        break;
      case 'logout':
        setUserData(null);
        setSelectedRole(null);
        setCurrentScreen('language');
        break;
      default:
        // Handle other pages as needed
        break;
    }
  };

  const goBackToDashboard = () => {
    if (selectedRole === 'shipper') {
      setCurrentScreen('shipperHome');
    } else if (selectedRole === 'trucker') {
      setCurrentScreen('truckerHome');
    } else if (selectedRole === 'agency') {
      setCurrentScreen('agencyDashboard');
    } else if (selectedRole === 'company') {
      setCurrentScreen('companyDashboard');
    } else if (selectedRole === 'fleetOwner') {
      setCurrentScreen('fleetOwnerDashboard');
    }
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-white">
        {currentScreen !== 'language' && <LanguageSwitcher />}
        
        {currentScreen === 'language' && (
          <EnhancedLanguageSelector onComplete={handleLanguageSelect} />
        )}

      {currentScreen === 'roleSelection' && (
        <RoleSelector 
          onSelectRole={handleRoleSelect}
          onBack={() => setCurrentScreen('language')}
        />
      )}

      {currentScreen === 'registration' && selectedRole && (
        <RegistrationFlows
          role={selectedRole}
          onComplete={handleRegistrationComplete}
          onBack={() => setCurrentScreen('roleSelection')}
        />
      )}

      {currentScreen === 'shipperHome' && (
        <ShipperHome
          onPostLoad={handlePostLoad}
          onShowSidebar={() => setSidebarOpen(true)}
        />
      )}

      {currentScreen === 'truckerHome' && (
        <TruckerHome
          onViewBidding={handleViewBidding}
          onShowSidebar={() => setSidebarOpen(true)}
        />
      )}

      {currentScreen === 'agencyDashboard' && (
        <AgencyDashboard onShowSidebar={() => setSidebarOpen(true)} />
      )}

      {currentScreen === 'companyDashboard' && (
        <CompanyDashboard onShowSidebar={() => setSidebarOpen(true)} />
      )}

      {currentScreen === 'fleetOwnerDashboard' && userData && (
        <FleetOwnerDashboard 
          userData={userData}
          onOpenSidebar={() => setSidebarOpen(true)} 
        />
      )}

      {currentScreen === 'postLoad' && (
        <PostLoadForm
          onSubmit={handlePostLoadSubmit}
          onBack={goBackToDashboard}
        />
      )}

      {currentScreen === 'liveBidding' && (
        <LiveBidding loadId={currentLoadId} onBack={goBackToDashboard} />
      )}

      {currentScreen === 'grievance' && (
        <GrievanceInsurance onBack={goBackToDashboard} />
      )}

      {currentScreen === 'settings' && (
        <Settings
          onBack={goBackToDashboard}
          onChangeLanguage={() => setCurrentScreen('language')}
        />
      )}

      {currentScreen === 'pro' && (
        <ProMembership onBack={goBackToDashboard} />
      )}

      {selectedRole && (
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          role={selectedRole}
          onNavigate={handleSidebarNavigate}
        />
      )}

        <SuccessModal
          isOpen={successModal.isOpen}
          onClose={() => setSuccessModal({ isOpen: false, message: '' })}
          message={successModal.message}
        />
      </div>
    </LanguageProvider>
  );
}
