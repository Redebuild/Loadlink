import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { X, User, FileText, Shield, Crown, Settings, LogOut, HelpCircle, Truck } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  role: 'shipper' | 'trucker' | 'agency' | 'company';
  onNavigate: (page: string) => void;
}

export function Sidebar({ isOpen, onClose, role, onNavigate }: SidebarProps) {
  const { t } = useLanguage();
  
  const roleColors = {
    shipper: 'bg-gradient-to-r from-blue-600 to-blue-700',
    trucker: 'bg-gradient-to-r from-green-600 to-green-700',
    agency: 'bg-gradient-to-r from-orange-600 to-orange-700',
    company: 'bg-gradient-to-r from-indigo-800 to-indigo-900',
  };

  const commonMenuItems = [
    { icon: User, label: t('profile'), page: 'profile' },
    { icon: FileText, label: t('grievance'), page: 'grievance' },
    { icon: Shield, label: t('insurance'), page: 'insurance' },
  ];

  const shipperMenu = [
    ...commonMenuItems,
    { icon: Crown, label: t('proMembership'), page: 'pro' },
    { icon: Settings, label: t('settings'), page: 'settings' },
  ];

  const truckerMenu = [
    { icon: User, label: t('profile'), page: 'profile' },
    { icon: Truck, label: t('myDocuments'), page: 'documents' },
    { icon: FileText, label: t('grievance'), page: 'grievance' },
    { icon: HelpCircle, label: t('support'), page: 'support' },
    { icon: Settings, label: t('settings'), page: 'settings' },
  ];

  const agencyMenu = [
    { icon: User, label: t('profile'), page: 'profile' },
    { icon: Truck, label: t('fleetManagement'), page: 'fleet' },
    { icon: Shield, label: t('insurance'), page: 'insurance' },
    { icon: FileText, label: t('reports'), page: 'reports' },
    { icon: Settings, label: t('settings'), page: 'settings' },
  ];

  const companyMenu = [
    { icon: User, label: t('profile'), page: 'profile' },
    { icon: FileText, label: t('reports'), page: 'reports' },
    { icon: Shield, label: t('insurance'), page: 'insurance' },
    { icon: Settings, label: t('settings'), page: 'settings' },
  ];

  const menuItems = {
    shipper: shipperMenu,
    trucker: truckerMenu,
    agency: agencyMenu,
    company: companyMenu,
  }[role];

  const handleNavigate = (page: string) => {
    onNavigate(page);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40"
          />
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed left-0 top-0 bottom-0 w-80 bg-white shadow-2xl z-50 flex flex-col"
          >
            <div className={`${roleColors[role]} text-white p-6 shadow-lg`}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-white drop-shadow-sm">{t('menu')}</h2>
                <Button variant="ghost" size="icon" onClick={onClose} className="text-white hover:bg-white/20 rounded-xl">
                  <X className="w-5 h-5" />
                </Button>
              </div>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-white/25 flex items-center justify-center mr-3 shadow-md">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-white drop-shadow-sm">User Name</p>
                  <p className="text-white/90 text-xs capitalize">{t(role)}</p>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              <nav className="space-y-2">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <motion.button
                      key={item.page}
                      whileHover={{ x: 4 }}
                      onClick={() => handleNavigate(item.page)}
                      className="w-full flex items-center px-4 py-3 rounded-xl hover:bg-gradient-to-r hover:from-orange-50 hover:to-blue-50 transition-colors text-left"
                    >
                      <Icon className="w-5 h-5 text-gray-600 mr-3" />
                      <span className="text-gray-900">{item.label}</span>
                    </motion.button>
                  );
                })}
              </nav>
            </div>

            <div className="p-4 border-t">
              <Button
                variant="ghost"
                className="w-full justify-start text-red-600 hover:bg-red-50 hover:text-red-700 rounded-xl"
                onClick={() => handleNavigate('logout')}
              >
                <LogOut className="w-5 h-5 mr-3" />
                {t('logout')}
              </Button>
              <p className="text-gray-500 text-xs text-center mt-4">{t('poweredBy')}</p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
