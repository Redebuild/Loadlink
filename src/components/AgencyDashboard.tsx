import { useState } from 'react';
import { motion } from 'motion/react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Truck, TrendingUp, Clock, DollarSign, Plus, Menu, MapPin, Send, Map, IndianRupee, Package, PackageX } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';

interface AgencyDashboardProps {
  onShowSidebar: () => void;
}

export function AgencyDashboard({ onShowSidebar }: AgencyDashboardProps) {
  const { t } = useLanguage();

  // Empty arrays - no mock data
  const trucks: any[] = [];
  const availableLoads: any[] = [];
  const activeTrips: any[] = [];
  const payments: any[] = [];

  const stats = [
    { label: 'Total Trucks', value: '0', icon: Truck, color: 'bg-blue-500' },
    { label: 'Active', value: '0', icon: TrendingUp, color: 'bg-green-500' },
    { label: 'Idle', value: '0', icon: Clock, color: 'bg-gray-500' },
    { label: 'Earnings', value: '₹0', icon: DollarSign, color: 'bg-blue-600' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 shadow-lg">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-white drop-shadow-sm">Agency Dashboard</h1>
            <p className="text-blue-100 text-sm mt-1">Express Logistics</p>
            <div className="flex items-center gap-1 mt-1">
              <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
              <div className="w-1.5 h-1.5 bg-blue-300 rounded-full"></div>
              <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
            </div>
          </div>
          <Button variant="ghost" onClick={onShowSidebar} className="text-white hover:bg-blue-700 rounded-xl">
            <Menu className="w-6 h-6" />
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="fleet" className="w-full">
        <TabsList className="w-full bg-white border-b rounded-none justify-start shadow-sm sticky top-0 z-10 overflow-x-auto">
          <TabsTrigger value="fleet" className="flex-1 whitespace-nowrap data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
            <Truck className="w-4 h-4 mr-2" />
            Fleet Dashboard
          </TabsTrigger>
          <TabsTrigger value="loads" className="flex-1 whitespace-nowrap data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
            <Package className="w-4 h-4 mr-2" />
            Available Loads
          </TabsTrigger>
          <TabsTrigger value="track" className="flex-1 whitespace-nowrap data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
            <Map className="w-4 h-4 mr-2" />
            Track Fleet
          </TabsTrigger>
          <TabsTrigger value="payments" className="flex-1 whitespace-nowrap data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
            <IndianRupee className="w-4 h-4 mr-2" />
            Payments
          </TabsTrigger>
        </TabsList>

        {/* Fleet Dashboard Tab */}
        <TabsContent value="fleet" className="p-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-3">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="p-4 rounded-xl border-2 border-gray-100 hover:shadow-lg transition-all">
                      <div className="flex items-center justify-between mb-2">
                        <div className={`${stat.color} p-2 rounded-xl shadow-md`}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                      </div>
                      <p className="text-gray-600 text-xs">{stat.label}</p>
                      <p className="text-gray-900 mt-1">{stat.value}</p>
                    </Card>
                  </motion.div>
                );
              })}
            </div>

            {/* Fleet List - Empty State */}
            <Card className="p-4 rounded-2xl shadow-lg border-2 border-blue-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-900 flex items-center">
                  <Truck className="w-5 h-5 mr-2 text-blue-600" />
                  Fleet Overview
                </h3>
                <Button size="sm" className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-xl shadow-md">
                  <Plus className="w-4 h-4 mr-1" />
                  Add Truck
                </Button>
              </div>

              {/* Empty State */}
              <div className="text-center py-16 text-gray-400">
                <Truck className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p className="text-gray-600 mb-2">No trucks added yet</p>
                <p className="text-sm text-gray-500">Add trucks to your fleet to get started</p>
              </div>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Available Loads Tab - Empty State */}
        <TabsContent value="loads" className="p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            <Card className="p-6 rounded-2xl shadow-lg border-2 border-blue-100">
              <h3 className="mb-4 text-gray-900 flex items-center">
                <Package className="w-5 h-5 mr-2 text-blue-600" />
                Available Loads Nearby
              </h3>
              
              {/* Empty State */}
              <div className="text-center py-16 text-gray-400">
                <PackageX className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p className="text-gray-600 mb-2">No loads available</p>
                <p className="text-sm text-gray-500">Available loads from shippers will appear here</p>
              </div>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Track Fleet Tab - Empty State */}
        <TabsContent value="track" className="p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            {/* Map Placeholder */}
            <Card className="p-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl shadow-lg border-0 h-64 flex items-center justify-center">
              <div className="text-center">
                <Map className="w-16 h-16 mx-auto mb-3 text-blue-100" />
                <h3 className="text-white mb-2">Live Fleet Tracking</h3>
                <p className="text-blue-100 text-sm">Real-time location of all active trucks</p>
                <Button variant="secondary" className="mt-4 rounded-xl">
                  View Full Map
                </Button>
              </div>
            </Card>

            {/* Active Trips - Empty State */}
            <Card className="p-6 rounded-2xl shadow-lg border-2 border-blue-100">
              <h3 className="mb-4 text-gray-900 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
                Active Trips (0)
              </h3>
              
              {/* Empty State */}
              <div className="text-center py-12 text-gray-400">
                <MapPin className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p className="text-gray-600 mb-2">No active trips</p>
                <p className="text-sm text-gray-500">Active trips will be shown here with live tracking</p>
              </div>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Payments Tab - Empty State */}
        <TabsContent value="payments" className="p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Card className="p-6 rounded-2xl shadow-lg border-2 border-blue-100">
              <h3 className="mb-4 text-gray-900 flex items-center">
                <IndianRupee className="w-5 h-5 mr-2 text-blue-600" />
                Payment History
              </h3>
              
              {/* Empty State */}
              <div className="text-center py-16 text-gray-400">
                <IndianRupee className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p className="text-gray-600 mb-2">No payment history</p>
                <p className="text-sm text-gray-500">Completed trips and payments will appear here</p>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Received</span>
                  <span className="text-green-600">₹0</span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-gray-600">Pending</span>
                  <span className="text-yellow-600">₹0</span>
                </div>
              </div>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
