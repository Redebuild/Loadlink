import { motion } from 'motion/react';
import { Package, Truck, Building2, Factory, TruckIcon, ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { useLanguage } from '../lib/LanguageContext';

interface RoleSelectorProps {
  onSelectRole: (role: 'shipper' | 'trucker' | 'agency' | 'company' | 'fleetOwner') => void;
  onBack?: () => void;
}

export function RoleSelector({ onSelectRole, onBack }: RoleSelectorProps) {
  const { t } = useLanguage();

  const roles = [
    {
      id: 'shipper' as const,
      icon: Package,
      title: t('shipper'),
      subtitle: t('shipperDesc'),
      color: 'bg-blue-500',
      hoverColor: 'hover:bg-blue-600',
      glowColor: 'shadow-blue-500/50',
    },
    {
      id: 'trucker' as const,
      icon: Truck,
      title: t('trucker'),
      subtitle: t('truckerDesc'),
      color: 'bg-green-500',
      hoverColor: 'hover:bg-green-600',
      glowColor: 'shadow-green-500/50',
    },
    {
      id: 'agency' as const,
      icon: Building2,
      title: t('agency'),
      subtitle: t('agencyDesc'),
      color: 'bg-orange-500',
      hoverColor: 'hover:bg-orange-600',
      glowColor: 'shadow-orange-500/50',
    },
    {
      id: 'fleetOwner' as const,
      icon: TruckIcon,
      title: t('fleetOwner'),
      subtitle: t('fleetOwnerDesc'),
      color: 'bg-amber-700',
      hoverColor: 'hover:bg-amber-800',
      glowColor: 'shadow-amber-500/50',
    },
    {
      id: 'company' as const,
      icon: Factory,
      title: t('transportCompany'),
      subtitle: t('transportCompanyDesc'),
      color: 'bg-indigo-900',
      hoverColor: 'hover:bg-indigo-950',
      glowColor: 'shadow-indigo-500/50',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-gray-100 to-orange-50 p-6 relative">
      {/* Back Button */}
      {onBack && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="absolute top-4 left-4 z-10"
        >
          <Button
            variant="outline"
            size="sm"
            onClick={onBack}
            className="bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">{t('back')}</span>
          </Button>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8 mt-8"
      >
        <h1 className="text-gray-900 mb-2 drop-shadow-sm">{t('chooseHowYouUse')}</h1>
        <p className="text-gray-700">{t('selectYourRole')}</p>
        <div className="mt-2 flex items-center justify-center gap-2">
          <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
          <div className="w-2 h-2 bg-blue-900 rounded-full"></div>
          <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
        </div>
      </motion.div>

      <div className="max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5">
        {roles.map((role, index) => {
          const Icon = role.icon;
          return (
            <motion.button
              key={role.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onSelectRole(role.id)}
              className={`${role.color} ${role.hoverColor} text-white rounded-xl p-8 shadow-xl transition-all duration-300 text-left border-2 border-white/20`}
            >
              <div className="flex flex-col items-center text-center">
                <div className="bg-white/25 backdrop-blur-sm p-5 rounded-full mb-4 shadow-lg">
                  <Icon className="w-14 h-14" strokeWidth={1.5} />
                </div>
                <h3 className="mb-2 drop-shadow-sm">{role.title}</h3>
                <p className="text-white/95 text-sm leading-relaxed">{role.subtitle}</p>
              </div>
            </motion.button>
          );
        })}
      </div>

      <div className="text-center mt-12">
        <p className="text-gray-600 text-sm drop-shadow-sm">{t('poweredBy')}</p>
        <div className="mt-4 flex items-center justify-center gap-1">
          <div className="w-8 h-1 bg-orange-500 rounded-full"></div>
          <div className="w-8 h-1 bg-blue-900 rounded-full"></div>
          <div className="w-8 h-1 bg-gray-400 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
