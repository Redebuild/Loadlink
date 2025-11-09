import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { MapPin, Package, History, Container, Truck, Menu, Search, TrendingUp, PackageX } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../lib/LanguageContext';

interface ShipperHomeProps {
  onPostLoad: () => void;
  onShowSidebar: () => void;
}

export function ShipperHome({ onPostLoad, onShowSidebar }: ShipperHomeProps) {
  const { t } = useLanguage();
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');

  // Empty arrays - no mock data
  const recentLoads: any[] = [];
  const activeLoads = recentLoads.filter((load) => load.status === 'In Transit');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 shadow-lg">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-white drop-shadow-sm">{t('shipperDashboard')}</h1>
            <div className="flex items-center gap-1 mt-1">
              <div className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-pulse"></div>
              <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
              <div className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-pulse"></div>
            </div>
          </div>
          <Button variant="ghost" onClick={onShowSidebar} className="text-white hover:bg-blue-700 rounded-xl">
            <Menu className="w-6 h-6" />
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="post" className="w-full">
        <TabsList className="w-full bg-white border-b rounded-none justify-start shadow-sm sticky top-0 z-10">
          <TabsTrigger value="post" className="flex-1 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
            <Package className="w-4 h-4 mr-2" />
            {t('post')}
          </TabsTrigger>
          <TabsTrigger value="track" className="flex-1 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
            <Search className="w-4 h-4 mr-2" />
            {t('track')}
          </TabsTrigger>
          <TabsTrigger value="history" className="flex-1 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
            <History className="w-4 h-4 mr-2" />
            {t('history')}
          </TabsTrigger>
        </TabsList>

        {/* Post Load Tab */}
        <TabsContent value="post" className="p-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {/* Post Load Form */}
            <Card className="p-6 shadow-lg rounded-2xl border-2 border-blue-100 bg-white">
              <h3 className="mb-4 text-blue-900 flex items-center">
                <Package className="w-5 h-5 mr-2" />
                {t('postNewLoad')}
              </h3>
              <div className="space-y-4">
                {/* Pickup From */}
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 w-5 h-5 text-blue-600" />
                  <Input
                    placeholder={t('pickupLocation') || "Pickup From (Address)"}
                    value={fromLocation}
                    onChange={(e) => setFromLocation(e.target.value)}
                    className="pl-10 rounded-xl border-2 border-gray-200 focus:border-blue-500 transition-colors"
                  />
                </div>

                {/* Deliver To */}
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 w-5 h-5 text-orange-600" />
                  <Input
                    placeholder={t('dropLocation') || "Deliver To (Address)"}
                    value={toLocation}
                    onChange={(e) => setToLocation(e.target.value)}
                    className="pl-10 rounded-xl border-2 border-gray-200 focus:border-blue-500 transition-colors"
                  />
                </div>

                {/* Post Load Button */}
                <Button 
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-xl shadow-lg h-12 transition-all hover:shadow-xl" 
                  onClick={onPostLoad}
                >
                  <Package className="w-5 h-5 mr-2" />
                  {t('postLoad')}
                </Button>
              </div>
            </Card>

            {/* Special Containers Booking */}
            <Card className="p-6 bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg rounded-2xl border-0 hover:shadow-xl transition-shadow cursor-pointer">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white mb-2 drop-shadow-sm flex items-center">
                    <Container className="w-5 h-5 mr-2" />
                    {t('specialContainerBooking') || "Special Containers Booking"}
                  </h3>
                  <p className="text-orange-100 text-sm">{t('forOversizedCargo') || "For oversized and special cargo"}</p>
                </div>
                <Truck className="w-14 h-14 text-orange-100 opacity-80" strokeWidth={1.5} />
              </div>
              <Button variant="secondary" className="w-full mt-4 rounded-xl shadow-md hover:bg-white hover:text-orange-600 transition-all h-11">
                <Container className="w-4 h-4 mr-2" />
                {t('bookNow') || "Book Now"}
              </Button>
            </Card>

            {/* Quick Stats - Show 0 when no data */}
            <div className="grid grid-cols-2 gap-3">
              <Card className="p-4 bg-gradient-to-br from-blue-50 to-white border-2 border-blue-100 rounded-xl">
                <p className="text-gray-600 text-sm">Active Loads</p>
                <p className="text-blue-700 mt-1">0</p>
              </Card>
              <Card className="p-4 bg-gradient-to-br from-green-50 to-white border-2 border-green-100 rounded-xl">
                <p className="text-gray-600 text-sm">Completed</p>
                <p className="text-green-700 mt-1">0</p>
              </Card>
            </div>
          </motion.div>
        </TabsContent>

        {/* Track Tab - Empty State */}
        <TabsContent value="track" className="p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            <Card className="p-6 rounded-2xl shadow-lg border-2 border-blue-100">
              <h3 className="mb-4 text-gray-900 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
                Active Loads
              </h3>
              
              {/* Empty State */}
              <div className="text-center py-16 text-gray-400">
                <PackageX className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p className="text-gray-600 mb-2">No active loads to track</p>
                <p className="text-sm text-gray-500">Post a load to see tracking information</p>
              </div>
            </Card>
          </motion.div>
        </TabsContent>

        {/* History Tab - Empty State */}
        <TabsContent value="history" className="p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Card className="p-6 rounded-2xl shadow-lg border-2 border-gray-100">
              <h3 className="mb-4 text-gray-900 flex items-center">
                <History className="w-5 h-5 mr-2 text-blue-600" />
                Load History
              </h3>
              
              {/* Empty State */}
              <div className="text-center py-16 text-gray-400">
                <History className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p className="text-gray-600 mb-2">No load history yet</p>
                <p className="text-sm text-gray-500">Your posted and completed loads will appear here</p>
              </div>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
