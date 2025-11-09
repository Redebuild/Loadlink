import { useState } from 'react';
import { motion } from 'motion/react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  TruckIcon, 
  Users, 
  MapPin, 
  DollarSign, 
  TrendingUp, 
  Menu,
  Calendar,
  Settings,
  Bell,
  Plus
} from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';

interface FleetOwnerDashboardProps {
  userData: any;
  onOpenSidebar: () => void;
}

export function FleetOwnerDashboard({ userData, onOpenSidebar }: FleetOwnerDashboardProps) {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'overview' | 'trucks' | 'drivers'>('overview');

  // Mock data for dashboard
  const stats = {
    totalTrucks: parseInt(userData.trucksOwned || 0) + parseInt(userData.trucksNotOwned || 0),
    ownedTrucks: parseInt(userData.trucksOwned || 0),
    leasedTrucks: parseInt(userData.trucksNotOwned || 0),
    activeTrucks: 7,
    availableDrivers: 12,
    activeLoads: 5,
    monthlyRevenue: '₹2,45,000',
  };

  const mockTrucks = [
    { id: 1, number: 'MH-12-AB-1234', status: 'Active', location: 'Mumbai', driver: 'Rajesh Kumar' },
    { id: 2, number: 'MH-02-CD-5678', status: 'In Transit', location: 'Pune', driver: 'Amit Singh' },
    { id: 3, number: 'DL-01-EF-9012', status: 'Maintenance', location: 'Delhi', driver: 'N/A' },
    { id: 4, number: 'GJ-05-GH-3456', status: 'Available', location: 'Ahmedabad', driver: 'Suresh Patel' },
    { id: 5, number: 'KA-03-IJ-7890', status: 'Active', location: 'Bangalore', driver: 'Vijay Reddy' },
  ];

  const mockDrivers = [
    { id: 1, name: 'Rajesh Kumar', truck: 'MH-12-AB-1234', status: 'On Duty', rating: 4.5 },
    { id: 2, name: 'Amit Singh', truck: 'MH-02-CD-5678', status: 'On Duty', rating: 4.8 },
    { id: 3, name: 'Suresh Patel', truck: 'GJ-05-GH-3456', status: 'Available', rating: 4.3 },
    { id: 4, name: 'Vijay Reddy', truck: 'KA-03-IJ-7890', status: 'On Duty', rating: 4.7 },
    { id: 5, name: 'Prakash Sharma', truck: '-', status: 'Off Duty', rating: 4.2 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-700 to-amber-800 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={onOpenSidebar}
                className="text-white hover:bg-amber-600"
              >
                <Menu className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="drop-shadow-sm">{t('fleetOwner')} Dashboard</h1>
                <p className="text-amber-100 text-sm">Welcome, {userData.ownerName}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" className="text-white hover:bg-amber-600">
                <Bell className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-white hover:bg-amber-600">
                <Settings className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="p-6 bg-white border-amber-200 shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Trucks</p>
                  <h3 className="text-amber-900">{stats.totalTrucks}</h3>
                  <p className="text-xs text-gray-500 mt-1">
                    {stats.ownedTrucks} owned, {stats.leasedTrucks} leased
                  </p>
                </div>
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                  <TruckIcon className="w-6 h-6 text-amber-700" />
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-6 bg-white border-amber-200 shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Active Trucks</p>
                  <h3 className="text-green-900">{stats.activeTrucks}</h3>
                  <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    On the road
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-green-700" />
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="p-6 bg-white border-amber-200 shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Available Drivers</p>
                  <h3 className="text-blue-900">{stats.availableDrivers}</h3>
                  <p className="text-xs text-gray-500 mt-1">Ready for assignments</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-700" />
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="p-6 bg-white border-amber-200 shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Monthly Revenue</p>
                  <h3 className="text-orange-900">{stats.monthlyRevenue}</h3>
                  <p className="text-xs text-orange-600 mt-1 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    +12% from last month
                  </p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-orange-700" />
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <div className="flex gap-8">
              <button
                onClick={() => setActiveTab('overview')}
                className={`pb-4 px-1 transition-colors ${
                  activeTab === 'overview'
                    ? 'border-b-2 border-amber-700 text-amber-900'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('trucks')}
                className={`pb-4 px-1 transition-colors ${
                  activeTab === 'trucks'
                    ? 'border-b-2 border-amber-700 text-amber-900'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Trucks ({stats.totalTrucks})
              </button>
              <button
                onClick={() => setActiveTab('drivers')}
                className={`pb-4 px-1 transition-colors ${
                  activeTab === 'drivers'
                    ? 'border-b-2 border-amber-700 text-amber-900'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Drivers ({stats.availableDrivers})
              </button>
            </div>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6 shadow-md">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-amber-900">Recent Activities</h3>
                <Button size="sm" variant="ghost" className="text-amber-700">
                  View All
                </Button>
              </div>
              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-amber-50 rounded-lg">
                    <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">Truck MH-12-AB-{1234 + i} completed delivery</p>
                      <p className="text-xs text-gray-500">2 hours ago</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6 shadow-md">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-amber-900">Quick Actions</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Button className="bg-amber-700 hover:bg-amber-800 h-24 flex flex-col gap-2">
                  <Plus className="w-6 h-6" />
                  <span>Add Truck</span>
                </Button>
                <Button className="bg-blue-700 hover:bg-blue-800 h-24 flex flex-col gap-2">
                  <Users className="w-6 h-6" />
                  <span>Add Driver</span>
                </Button>
                <Button className="bg-green-700 hover:bg-green-800 h-24 flex flex-col gap-2">
                  <Calendar className="w-6 h-6" />
                  <span>Schedule Trip</span>
                </Button>
                <Button className="bg-orange-700 hover:bg-orange-800 h-24 flex flex-col gap-2">
                  <DollarSign className="w-6 h-6" />
                  <span>View Earnings</span>
                </Button>
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'trucks' && (
          <Card className="p-6 shadow-md">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-amber-900">Fleet Overview</h3>
              <Button className="bg-amber-700 hover:bg-amber-800">
                <Plus className="w-4 h-4 mr-2" />
                Add Truck
              </Button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm text-gray-600">Truck Number</th>
                    <th className="text-left py-3 px-4 text-sm text-gray-600">Status</th>
                    <th className="text-left py-3 px-4 text-sm text-gray-600">Location</th>
                    <th className="text-left py-3 px-4 text-sm text-gray-600">Driver</th>
                    <th className="text-left py-3 px-4 text-sm text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {mockTrucks.map((truck) => (
                    <tr key={truck.id} className="border-b border-gray-100 hover:bg-amber-50/50">
                      <td className="py-4 px-4">{truck.number}</td>
                      <td className="py-4 px-4">
                        <Badge
                          className={
                            truck.status === 'Active'
                              ? 'bg-green-100 text-green-800'
                              : truck.status === 'In Transit'
                              ? 'bg-blue-100 text-blue-800'
                              : truck.status === 'Maintenance'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-gray-100 text-gray-800'
                          }
                        >
                          {truck.status}
                        </Badge>
                      </td>
                      <td className="py-4 px-4">{truck.location}</td>
                      <td className="py-4 px-4">{truck.driver}</td>
                      <td className="py-4 px-4">
                        <Button size="sm" variant="outline" className="text-amber-700 hover:bg-amber-50">
                          View Details
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}

        {activeTab === 'drivers' && (
          <Card className="p-6 shadow-md">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-amber-900">Driver Management</h3>
              <Button className="bg-amber-700 hover:bg-amber-800">
                <Plus className="w-4 h-4 mr-2" />
                Add Driver
              </Button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm text-gray-600">Driver Name</th>
                    <th className="text-left py-3 px-4 text-sm text-gray-600">Assigned Truck</th>
                    <th className="text-left py-3 px-4 text-sm text-gray-600">Status</th>
                    <th className="text-left py-3 px-4 text-sm text-gray-600">Rating</th>
                    <th className="text-left py-3 px-4 text-sm text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {mockDrivers.map((driver) => (
                    <tr key={driver.id} className="border-b border-gray-100 hover:bg-amber-50/50">
                      <td className="py-4 px-4">{driver.name}</td>
                      <td className="py-4 px-4">{driver.truck}</td>
                      <td className="py-4 px-4">
                        <Badge
                          className={
                            driver.status === 'On Duty'
                              ? 'bg-green-100 text-green-800'
                              : driver.status === 'Available'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-gray-100 text-gray-800'
                          }
                        >
                          {driver.status}
                        </Badge>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-1">
                          <span className="text-yellow-500">★</span>
                          <span>{driver.rating}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <Button size="sm" variant="outline" className="text-amber-700 hover:bg-amber-50">
                          View Profile
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
