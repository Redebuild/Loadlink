import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card } from './ui/card';
import { Upload, TruckIcon, Plus, X } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';

interface Driver {
  id: number;
  name: string;
  idProofFile: File | null;
}

interface FleetOwnerRegistrationProps {
  formData: any;
  updateFormData: (key: string, value: string) => void;
  setShowOTP: (show: boolean) => void;
  roleColor: string;
}

export function FleetOwnerRegistration({ formData, updateFormData, setShowOTP, roleColor }: FleetOwnerRegistrationProps) {
  const { t } = useLanguage();
  const [drivers, setDrivers] = useState<Driver[]>([
    { id: 1, name: '', idProofFile: null }
  ]);
  const [ownerIdFile, setOwnerIdFile] = useState<File | null>(null);

  const addDriver = () => {
    const newDriver: Driver = {
      id: Date.now(),
      name: '',
      idProofFile: null
    };
    setDrivers([...drivers, newDriver]);
  };

  const removeDriver = (id: number) => {
    if (drivers.length > 1) {
      setDrivers(drivers.filter(driver => driver.id !== id));
    }
  };

  const updateDriverName = (id: number, name: string) => {
    setDrivers(drivers.map(driver => 
      driver.id === id ? { ...driver, name } : driver
    ));
  };

  const handleDriverIdUpload = (id: number, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setDrivers(drivers.map(driver => 
        driver.id === id ? { ...driver, idProofFile: e.target.files![0] } : driver
      ));
    }
  };

  const handleOwnerIdUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setOwnerIdFile(e.target.files[0]);
      updateFormData('ownerIdProof', e.target.files[0].name);
    }
  };

  const allDriversValid = drivers.every(driver => driver.name && driver.idProofFile);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Form Section */}
      <Card className="p-8 shadow-xl rounded-2xl border-2 border-amber-100">
        <div className="mb-6">
          <h2 className="text-amber-900 mb-2">{t('fleetOwnerRegistration')}</h2>
          <p className="text-gray-600 text-sm">{t('registerFleetManageEfficiently')}</p>
        </div>
        
        <div className="space-y-5">
          {/* Fleet Owner Name */}
          <div>
            <Label htmlFor="ownerName" className="mb-2 block text-gray-700">
              {t('fleetOwnerName')}
            </Label>
            <Input
              id="ownerName"
              type="text"
              placeholder={t('enterFullNameFleetOwner')}
              value={formData.ownerName || ''}
              onChange={(e) => updateFormData('ownerName', e.target.value)}
              className="rounded-xl border-gray-300 focus:border-amber-500 focus:ring-amber-500"
            />
          </div>

          {/* Trucks Owned by Self */}
          <div>
            <Label htmlFor="trucksOwned" className="mb-2 block text-gray-700">
              {t('trucksOwnedBySelf')}
            </Label>
            <Input
              id="trucksOwned"
              type="number"
              placeholder="e.g., 5"
              min="0"
              value={formData.trucksOwned || ''}
              onChange={(e) => updateFormData('trucksOwned', e.target.value)}
              className="rounded-xl border-gray-300 focus:border-amber-500 focus:ring-amber-500"
            />
          </div>

          {/* Trucks Not Owned by Self */}
          <div>
            <Label htmlFor="trucksNotOwned" className="mb-2 block text-gray-700">
              {t('trucksNotOwnedBySelf')}
            </Label>
            <Input
              id="trucksNotOwned"
              type="number"
              placeholder="e.g., 2"
              min="0"
              value={formData.trucksNotOwned || ''}
              onChange={(e) => updateFormData('trucksNotOwned', e.target.value)}
              className="rounded-xl border-gray-300 focus:border-amber-500 focus:ring-amber-500"
            />
          </div>

          {/* Drivers Section */}
          <div className="border-t pt-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm text-gray-600">{t('driversInformation')}</h4>
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={addDriver}
                className="rounded-xl border-amber-300 text-amber-700 hover:bg-amber-50 hover:border-amber-500"
              >
                <Plus className="w-4 h-4 mr-1" />
                {t('addDriver')}
              </Button>
            </div>

            {drivers.map((driver, index) => (
              <div key={driver.id} className="space-y-4 mb-6 p-4 bg-amber-50/30 rounded-xl border border-amber-100">
                {/* Driver Header with Remove Button */}
                <div className="flex items-center justify-between">
                  <Label className="text-gray-700">
                    {t('driver')} {index + 1}
                  </Label>
                  {drivers.length > 1 && (
                    <Button
                      type="button"
                      size="sm"
                      variant="ghost"
                      onClick={() => removeDriver(driver.id)}
                      className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>

                {/* Driver's Name */}
                <div>
                  <Label htmlFor={`driverName-${driver.id}`} className="mb-2 block text-gray-700 text-sm">
                    {t('driverName')}
                  </Label>
                  <Input
                    id={`driverName-${driver.id}`}
                    type="text"
                    placeholder={t('enterDriverFullName')}
                    value={driver.name}
                    onChange={(e) => updateDriverName(driver.id, e.target.value)}
                    className="rounded-xl border-gray-300 focus:border-amber-500 focus:ring-amber-500"
                  />
                </div>

                {/* Driver's ID Proof Upload */}
                <div>
                  <Label htmlFor={`driverIdUpload-${driver.id}`} className="mb-2 block text-gray-700 text-sm">
                    {t('driverIdProof')}
                  </Label>
                  <div className="relative">
                    <input
                      id={`driverIdUpload-${driver.id}`}
                      type="file"
                      accept="image/*,.pdf"
                      onChange={(e) => handleDriverIdUpload(driver.id, e)}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById(`driverIdUpload-${driver.id}`)?.click()}
                      className="w-full justify-start rounded-xl border-amber-200 hover:border-amber-500 hover:bg-amber-50"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      {driver.idProofFile ? driver.idProofFile.name : t('uploadDriverIdProof')}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Fleet Owner's ID Proof Upload */}
          <div>
            <Label htmlFor="ownerIdUpload" className="mb-2 block text-gray-700">
              {t('fleetOwnerIdProof')}
            </Label>
            <div className="relative">
              <input
                id="ownerIdUpload"
                type="file"
                accept="image/*,.pdf"
                onChange={handleOwnerIdUpload}
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById('ownerIdUpload')?.click()}
                className="w-full justify-start rounded-xl border-amber-200 hover:border-amber-500 hover:bg-amber-50"
              >
                <Upload className="w-4 h-4 mr-2" />
                {ownerIdFile ? ownerIdFile.name : t('fleetOwnerIdProof')}
              </Button>
            </div>
          </div>

          {/* ID Proof Information Note */}
          <div className="bg-amber-50 p-4 rounded-xl border border-amber-200">
            <p className="text-xs italic text-gray-600 leading-relaxed">
              {t('idProofInfo')}
            </p>
          </div>

          {/* Username and Password Section */}
          <div className="border-t pt-6">
            <h4 className="text-sm text-gray-600 mb-4">Account Credentials</h4>
          </div>

          <div>
            <Label htmlFor="username" className="mb-2 block text-gray-700">
              {t('username')}
            </Label>
            <Input
              id="username"
              type="text"
              placeholder={t('enterUsername')}
              value={formData.username || ''}
              onChange={(e) => updateFormData('username', e.target.value)}
              className="rounded-xl border-gray-300 focus:border-amber-500 focus:ring-amber-500"
            />
          </div>

          <div>
            <Label htmlFor="password" className="mb-2 block text-gray-700">
              {t('password')}
            </Label>
            <Input
              id="password"
              type="password"
              placeholder={t('createPassword')}
              value={formData.password || ''}
              onChange={(e) => updateFormData('password', e.target.value)}
              className="rounded-xl border-gray-300 focus:border-amber-500 focus:ring-amber-500"
            />
          </div>

          {/* Proceed to OTP Button */}
          <Button
            className={`w-full ${roleColor} text-white rounded-xl shadow-lg hover:shadow-xl transition-all`}
            onClick={() => setShowOTP(true)}
            disabled={
              !formData.ownerName ||
              !formData.trucksOwned ||
              !formData.trucksNotOwned ||
              !allDriversValid ||
              !ownerIdFile ||
              !formData.username ||
              !formData.password
            }
          >
            {t('proceedToOTP')}
          </Button>

          {/* Already Registered Link */}
          <div className="text-center">
            <button className="text-sm text-amber-700 hover:text-amber-900 hover:underline transition-colors">
              {t('alreadyRegistered')}? {t('loginHere')}
            </button>
          </div>
        </div>
      </Card>

      {/* Illustration Section - Desktop Only */}
      <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-8">
        <div className="text-center space-y-6">
          <div className="relative">
            {/* Truck Illustration Placeholder */}
            <div className="w-64 h-64 mx-auto bg-gradient-to-br from-amber-200 to-amber-400 rounded-full flex items-center justify-center shadow-2xl">
              <TruckIcon className="w-32 h-32 text-white" strokeWidth={1.5} />
            </div>
            {/* Decorative Elements */}
            <motion.div
              className="absolute top-0 right-0 w-16 h-16 bg-orange-400 rounded-full opacity-60"
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <motion.div
              className="absolute bottom-0 left-0 w-12 h-12 bg-amber-500 rounded-full opacity-60"
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            />
          </div>
          <div>
            <h3 className="text-amber-900 mb-2">
              {t('fleetOwner')}
            </h3>
            <p className="text-gray-600 leading-relaxed max-w-sm mx-auto">
              {t('fleetOwnerDesc')}
            </p>
          </div>
          <div className="flex items-center justify-center gap-2 text-amber-700">
            <div className="w-3 h-3 bg-amber-500 rounded-full animate-pulse"></div>
            <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse delay-75"></div>
            <div className="w-3 h-3 bg-amber-600 rounded-full animate-pulse delay-150"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
