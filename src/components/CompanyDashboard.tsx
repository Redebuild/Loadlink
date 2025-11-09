import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { TrendingUp, Package, Users, DollarSign, Truck, Menu, MapPin, Send, CheckCircle, FileText, IndianRupee, BarChart3, Settings, PackageX } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../lib/LanguageContext';

interface CompanyDashboardProps {
  onShowSidebar: () => void;
}

export function CompanyDashboard({ onShowSidebar }: CompanyDashboardProps) {
  const { t } = useLanguage();
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropLocation, setDropLocation] = useState('');

  // Empty arrays - no mock data
  const postedLoads: any[] = [];
  const ledger: any[] = [];

  const kpis = [
    { label: 'Total Loads', value: '0', change: '+0%', icon: Package, color: 'bg-purple-600' },
    { label: 'Avg Cost/km', value: '₹0', change: '0%', icon: TrendingUp, color: 'bg-green-600' },
    { label: 'Active Drivers', value: '0', change: '+0%', icon: Users, color: 'bg-blue-600' },
    { label: 'Monthly Profit', value: '₹0', change: '+0%', icon: DollarSign, color: 'bg-purple-700' },
  ];

  const fleet = [
    { type: 'Heavy Trucks', count: 0, active: 0, maintenance: 0 },
    { type: 'Medium Trucks', count: 0, active: 0, maintenance: 0 },
    { type: 'Light Vehicles', count: 0, active: 0, maintenance: 0 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white p-4 shadow-lg">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-white drop-shadow-sm">Company Dashboard</h1>
            <p className="text-purple-200 text-sm mt-1">TransNation Logistics Ltd.</p>
            <div className="flex items-center gap-1 mt-1">
              <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
              <div className="w-1.5 h-1.5 bg-purple-300 rounded-full"></div>
              <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
            </div>
          </div>
          <Button variant="ghost" onClick={onShowSidebar} className="text-white hover:bg-purple-700 rounded-xl">
            <Menu className="w-6 h-6" />
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="p-4">
        <div className="grid grid-cols-2 gap-3 mb-4">
          {kpis.map((kpi, index) => {
            const Icon = kpi.icon;
            return (
              <motion.div
                key={kpi.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-4 rounded-xl border-2 border-purple-100 hover:shadow-lg transition-all">
                  <div className={`${kpi.color} w-10 h-10 rounded-xl flex items-center justify-center mb-2 shadow-md`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-gray-600 text-xs">{kpi.label}</p>
                  <div className="flex items-end justify-between mt-1">
                    <p className="text-gray-900">{kpi.value}</p>
                    <span className="text-xs text-gray-500">{kpi.change}</span>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Tabs */}
        <Tabs defaultValue="post" className="w-full">
          <TabsList className="w-full bg-white border rounded-lg p-1 shadow-sm grid grid-cols-4 gap-1">
            <TabsTrigger value="post" className="data-[state=active]:bg-purple-50 data-[state=active]:text-purple-700 rounded-md text-xs">
              <Send className="w-3 h-3 mr-1" />
              Post Loads
            </TabsTrigger>
            <TabsTrigger value="bids" className="data-[state=active]:bg-purple-50 data-[state=active]:text-purple-700 rounded-md text-xs">
              <Package className="w-3 h-3 mr-1" />
              Manage Bids
            </TabsTrigger>
            <TabsTrigger value="fleet" className="data-[state=active]:bg-purple-50 data-[state=active]:text-purple-700 rounded-md text-xs">
              <Truck className="w-3 h-3 mr-1" />
              Fleet
            </TabsTrigger>
            <TabsTrigger value="ledger" className="data-[state=active]:bg-purple-50 data-[state=active]:text-purple-700 rounded-md text-xs">
              <FileText className="w-3 h-3 mr-1" />
              Ledger
            </TabsTrigger>
          </TabsList>

          {/* Post Loads Tab */}
          <TabsContent value="post" className="space-y-3 mt-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="p-6 rounded-2xl border-2 border-purple-100 shadow-lg">
                <h3 className="mb-4 text-gray-900 flex items-center">
                  <Send className="w-5 h-5 mr-2 text-purple-600" />
                  Post New Load
                </h3>
                <div className="space-y-4">
                  {/* Pickup Point */}
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 w-5 h-5 text-purple-600" />
                    <Input
                      placeholder="Pickup Point (Address)"
                      value={pickupLocation}
                      onChange={(e) => setPickupLocation(e.target.value)}
                      className="pl-10 rounded-xl border-2 border-gray-200 focus:border-purple-500 transition-colors"
                    />
                  </div>

                  {/* Drop Point */}
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 w-5 h-5 text-orange-600" />
                    <Input
                      placeholder="Drop Point (Address)"
                      value={dropLocation}
                      onChange={(e) => setDropLocation(e.target.value)}
                      className="pl-10 rounded-xl border-2 border-gray-200 focus:border-purple-500 transition-colors"
                    />
                  </div>

                  {/* Vehicle Type & Weight */}
                  <div className="grid grid-cols-2 gap-3">
                    <Input
                      placeholder="Vehicle Type"
                      className="rounded-xl border-2 border-gray-200 focus:border-purple-500"
                    />
                    <Input
                      placeholder="Load Weight"
                      className="rounded-xl border-2 border-gray-200 focus:border-purple-500"
                    />
                  </div>

                  {/* Post Load Button */}
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 rounded-xl shadow-lg h-12 transition-all">
                    <Send className="w-4 h-4 mr-2" />
                    Post Load
                  </Button>
                </div>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Manage Bids Tab - Empty State */}
          <TabsContent value="bids" className="space-y-3 mt-4">
            <Card className="p-6 rounded-2xl border-2 border-purple-100 shadow-lg">
              <h3 className="mb-4 text-gray-900 flex items-center">
                <Package className="w-5 h-5 mr-2 text-purple-600" />
                Posted Loads & Bids
              </h3>
              
              {/* Empty State */}
              <div className="text-center py-16 text-gray-400">
                <PackageX className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p className="text-gray-600 mb-2">No loads posted yet</p>
                <p className="text-sm text-gray-500">Post a load to receive bids from truckers</p>
              </div>
            </Card>
          </TabsContent>

          {/* Fleet Management Tab */}
          <TabsContent value="fleet" className="space-y-3 mt-4">
            <Card className="p-6 rounded-2xl border-2 border-purple-100 shadow-lg">
              <h3 className="mb-4 text-gray-900 flex items-center">
                <Truck className="w-5 h-5 mr-2 text-purple-600" />
                Fleet Management
              </h3>
              <div className="space-y-4">
                {fleet.map((category, index) => (
                  <motion.div
                    key={category.type}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="border-2 border-purple-100 rounded-xl p-4 bg-white hover:shadow-md transition-all"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <div className="bg-purple-100 p-2 rounded-lg mr-3">
                          <Truck className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                          <p className="text-gray-900 text-sm">{category.type}</p>
                          <p className="text-gray-500 text-xs mt-1">
                            Total: {category.count} | Active: {category.active}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500">Maintenance</p>
                        <p className="text-orange-600 text-sm">{category.maintenance}</p>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full transition-all"
                        style={{ width: '0%' }}
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-2 text-right">0% Active</p>
                  </motion.div>
                ))}
              </div>

              <Button variant="outline" className="w-full mt-4 rounded-xl border-2 border-purple-200 hover:bg-purple-50">
                <Settings className="w-4 h-4 mr-2" />
                Driver Assignment
              </Button>
            </Card>
          </TabsContent>

          {/* Ledger Tab - Empty State */}
          <TabsContent value="ledger" className="space-y-3 mt-4">
            <Card className="p-6 rounded-2xl border-2 border-purple-100 shadow-lg">
              <h3 className="mb-4 text-gray-900 flex items-center">
                <FileText className="w-5 h-5 mr-2 text-purple-600" />
                Transaction Ledger
              </h3>
              
              {/* Empty State */}
              <div className="text-center py-16 text-gray-400">
                <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p className="text-gray-600 mb-2">No transactions yet</p>
                <p className="text-sm text-gray-500">Your payment history will appear here</p>
              </div>

              {/* Summary */}
              <div className="mt-6 pt-4 border-t-2 border-purple-100 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">Payment Received</span>
                  <span className="text-green-600">₹0</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">Pending Dues</span>
                  <span className="text-yellow-600">₹0</span>
                </div>
              </div>

              <Button variant="outline" className="w-full mt-4 rounded-xl border-2 border-purple-200 hover:bg-purple-50">
                <BarChart3 className="w-4 h-4 mr-2" />
                View Full Report
              </Button>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
