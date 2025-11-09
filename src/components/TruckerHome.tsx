import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { MapPin, DollarSign, Clock, Navigation, Menu, IndianRupee, PackageX, Receipt } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../lib/LanguageContext';

interface TruckerHomeProps {
  onViewBidding: (loadId: string) => void;
  onShowSidebar: () => void;
}

export function TruckerHome({ onViewBidding, onShowSidebar }: TruckerHomeProps) {
  const { t } = useLanguage();

  // Empty arrays - no mock data
  const nearbyLoads: any[] = [];
  const activeBids: any[] = [];
  const payouts: any[] = [];
  const expenses: any[] = [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-4 shadow-lg">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-white drop-shadow-sm">Trucker Dashboard</h1>
            <div className="flex items-center gap-1 mt-1">
              <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
              <div className="w-1.5 h-1.5 bg-orange-300 rounded-full"></div>
              <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
            </div>
          </div>
          <Button variant="ghost" onClick={onShowSidebar} className="text-white hover:bg-orange-600 rounded-xl">
            <Menu className="w-6 h-6" />
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="scan" className="w-full">
        <TabsList className="w-full bg-white border-b rounded-none justify-start overflow-x-auto shadow-sm sticky top-0 z-10">
          <TabsTrigger value="scan" className="flex-1 whitespace-nowrap data-[state=active]:bg-orange-50 data-[state=active]:text-orange-700">
            <Navigation className="w-4 h-4 mr-2" />
            Scan Nearby
          </TabsTrigger>
          <TabsTrigger value="payouts" className="flex-1 whitespace-nowrap data-[state=active]:bg-orange-50 data-[state=active]:text-orange-700">
            <IndianRupee className="w-4 h-4 mr-2" />
            Payout
          </TabsTrigger>
          <TabsTrigger value="history" className="flex-1 whitespace-nowrap data-[state=active]:bg-orange-50 data-[state=active]:text-orange-700">
            <Clock className="w-4 h-4 mr-2" />
            History
          </TabsTrigger>
          <TabsTrigger value="expenses" className="flex-1 whitespace-nowrap data-[state=active]:bg-orange-50 data-[state=active]:text-orange-700">
            <DollarSign className="w-4 h-4 mr-2" />
            Expenses
          </TabsTrigger>
        </TabsList>

        {/* Scan Nearby Tab - Empty State */}
        <TabsContent value="scan" className="p-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {/* Map Placeholder */}
            <Card className="p-6 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-2xl shadow-lg border-0">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm">Available Loads Nearby</p>
                  <h2 className="text-white mt-1">0 Loads</h2>
                </div>
                <Navigation className="w-12 h-12 text-orange-100 opacity-80" />
              </div>
              <Button variant="secondary" className="w-full mt-4 rounded-xl shadow-md hover:bg-white hover:text-orange-600 transition-all">
                <MapPin className="w-4 h-4 mr-2" />
                View on Map
              </Button>
            </Card>

            {/* Empty State for Nearby Loads */}
            <Card className="p-6 rounded-2xl shadow-lg border-2 border-orange-100">
              <div className="text-center py-16 text-gray-400">
                <PackageX className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p className="text-gray-600 mb-2">No loads available nearby</p>
                <p className="text-sm text-gray-500">Available loads will appear here when shippers post them</p>
              </div>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Payout Tab - Empty State */}
        <TabsContent value="payouts" className="p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Card className="p-6 rounded-2xl shadow-lg border-2 border-orange-100">
              <h3 className="mb-4 text-gray-900 flex items-center">
                <IndianRupee className="w-5 h-5 mr-2 text-orange-600" />
                Payout History
              </h3>
              
              {/* Empty State */}
              <div className="text-center py-16 text-gray-400">
                <Receipt className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p className="text-gray-600 mb-2">No payouts yet</p>
                <p className="text-sm text-gray-500">Complete deliveries to receive payments</p>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Earnings</span>
                  <span className="text-green-600">₹0</span>
                </div>
              </div>
            </Card>
          </motion.div>
        </TabsContent>

        {/* History Tab - Empty State */}
        <TabsContent value="history" className="p-4">
          <Card className="p-6 rounded-2xl shadow-lg border-2 border-gray-100">
            <h3 className="mb-4 text-gray-900 flex items-center">
              <Clock className="w-5 h-5 mr-2 text-orange-600" />
              Delivery History
            </h3>
            
            {/* Empty State */}
            <div className="text-center py-16 text-gray-400">
              <Clock className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p className="text-gray-600 mb-2">No delivery history</p>
              <p className="text-sm text-gray-500">Your completed deliveries will appear here</p>
            </div>
          </Card>
        </TabsContent>

        {/* Expenses Tab - Empty State */}
        <TabsContent value="expenses" className="p-4">
          <Card className="p-6 rounded-2xl shadow-lg border-2 border-orange-100">
            <h3 className="mb-4 text-gray-900 flex items-center">
              <DollarSign className="w-5 h-5 mr-2 text-orange-600" />
              Trip Expenses
            </h3>
            <Button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 rounded-xl shadow-lg mb-4">
              <DollarSign className="w-4 h-4 mr-2" />
              Add Expense
            </Button>
            
            {/* Empty State */}
            <div className="text-center py-12 text-gray-400">
              <DollarSign className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p className="text-gray-600 mb-2">No expenses recorded</p>
              <p className="text-sm text-gray-500">Track your trip expenses here</p>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Expenses</span>
                <span className="text-orange-600">₹0</span>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
