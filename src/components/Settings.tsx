import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { ArrowLeft, Globe, Bell, Lock, HelpCircle, LogOut } from 'lucide-react';

interface SettingsProps {
  onBack: () => void;
  onChangeLanguage: () => void;
}

export function Settings({ onBack, onChangeLanguage }: SettingsProps) {
  const [notifications, setNotifications] = useState({
    push: true,
    email: false,
    sms: true,
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-indigo-600 text-white p-4">
        <Button variant="ghost" onClick={onBack} className="text-white hover:bg-indigo-700 mb-2">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <h2 className="text-white">Settings</h2>
      </div>

      <div className="p-4 space-y-4">
        <Card className="p-6">
          <h3 className="mb-4 text-gray-900">General</h3>
          <button
            onClick={onChangeLanguage}
            className="w-full flex items-center justify-between py-3 border-b"
          >
            <div className="flex items-center">
              <Globe className="w-5 h-5 text-gray-600 mr-3" />
              <span className="text-gray-900">Language</span>
            </div>
            <span className="text-gray-600 text-sm">English</span>
          </button>
        </Card>

        <Card className="p-6">
          <h3 className="mb-4 text-gray-900">Notifications</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center">
                <Bell className="w-5 h-5 text-gray-600 mr-3" />
                <div>
                  <Label htmlFor="push" className="text-gray-900">{t('pushNotifications')}</Label>
                  <p className="text-xs text-gray-600">{t('receivePushNotifications')}</p>
                </div>
              </div>
              <Switch
                id="push"
                checked={notifications.push}
                onCheckedChange={(checked) =>
                  setNotifications({ ...notifications, push: checked })
                }
              />
            </div>

            <div className="flex items-center justify-between py-2">
              <div className="flex items-center">
                <Bell className="w-5 h-5 text-gray-600 mr-3" />
                <div>
                  <Label htmlFor="email" className="text-gray-900">{t('emailNotifications')}</Label>
                  <p className="text-xs text-gray-600">{t('receiveEmailUpdates')}</p>
                </div>
              </div>
              <Switch
                id="email"
                checked={notifications.email}
                onCheckedChange={(checked) =>
                  setNotifications({ ...notifications, email: checked })
                }
              />
            </div>

            <div className="flex items-center justify-between py-2">
              <div className="flex items-center">
                <Bell className="w-5 h-5 text-gray-600 mr-3" />
                <div>
                  <Label htmlFor="sms" className="text-gray-900">{t('smsNotifications')}</Label>
                  <p className="text-xs text-gray-600">{t('receiveSmsAlerts')}</p>
                </div>
              </div>
              <Switch
                id="sms"
                checked={notifications.sms}
                onCheckedChange={(checked) =>
                  setNotifications({ ...notifications, sms: checked })
                }
              />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="mb-4 text-gray-900">{t('securityPrivacy')}</h3>
          <button className="w-full flex items-center py-3 border-b">
            <Lock className="w-5 h-5 text-gray-600 mr-3" />
            <span className="text-gray-900">{t('changePassword')}</span>
          </button>
          <button className="w-full flex items-center py-3 border-b">
            <Lock className="w-5 h-5 text-gray-600 mr-3" />
            <span className="text-gray-900">Privacy Policy</span>
          </button>
          <button className="w-full flex items-center py-3">
            <Lock className="w-5 h-5 text-gray-600 mr-3" />
            <span className="text-gray-900">Terms & Conditions</span>
          </button>
        </Card>

        <Card className="p-6">
          <h3 className="mb-4 text-gray-900">Support</h3>
          <button className="w-full flex items-center py-3 border-b">
            <HelpCircle className="w-5 h-5 text-gray-600 mr-3" />
            <span className="text-gray-900">Help Center</span>
          </button>
          <button className="w-full flex items-center py-3 border-b">
            <HelpCircle className="w-5 h-5 text-gray-600 mr-3" />
            <span className="text-gray-900">Contact Support</span>
          </button>
          <button className="w-full flex items-center py-3">
            <HelpCircle className="w-5 h-5 text-gray-600 mr-3" />
            <span className="text-gray-900">About LoadLink</span>
          </button>
        </Card>

        <Button variant="destructive" className="w-full h-12">
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>

        <p className="text-center text-gray-500 text-xs">
          Version 1.0.0 • Powered by LoadLink
        </p>
      </div>
    </div>
  );
}
