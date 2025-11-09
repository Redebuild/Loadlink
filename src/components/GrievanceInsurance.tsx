import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Card } from './ui/card';
import { ArrowLeft, Upload, FileText, Shield } from 'lucide-react';

interface GrievanceInsuranceProps {
  onBack: () => void;
}

export function GrievanceInsurance({ onBack }: GrievanceInsuranceProps) {
  const [grievanceForm, setGrievanceForm] = useState({
    category: '',
    description: '',
  });

  const [insuranceForm, setInsuranceForm] = useState({
    loadId: '',
    claimAmount: '',
    description: '',
  });

  const complaints = [
    { id: 'GR001', category: 'Payment Delay', status: 'In Progress', date: '2025-11-05' },
    { id: 'GR002', category: 'Vehicle Issue', status: 'Resolved', date: '2025-11-03' },
  ];

  const insurancePolicies = [
    { id: 'INS001', loadId: 'LD001', coverage: '₹5,00,000', status: 'Active' },
    { id: 'INS002', loadId: 'LD002', coverage: '₹3,50,000', status: 'Claimed' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-indigo-600 text-white p-4">
        <Button variant="ghost" onClick={onBack} className="text-white hover:bg-indigo-700 mb-2">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <h2 className="text-white">Grievance & Insurance</h2>
      </div>

      <Tabs defaultValue="grievance" className="w-full">
        <TabsList className="w-full bg-white border-b rounded-none justify-start">
          <TabsTrigger value="grievance" className="flex-1">Grievance</TabsTrigger>
          <TabsTrigger value="insurance" className="flex-1">Insurance</TabsTrigger>
        </TabsList>

        <TabsContent value="grievance" className="p-4 space-y-4">
          <Card className="p-6">
            <h3 className="mb-4 text-gray-900">File a Complaint</h3>
            <div className="space-y-4">
              <div>
                <Label>Category</Label>
                <select
                  className="w-full h-10 px-3 rounded-md border border-gray-300 mt-2"
                  value={grievanceForm.category}
                  onChange={(e) =>
                    setGrievanceForm({ ...grievanceForm, category: e.target.value })
                  }
                >
                  <option value="">Select category</option>
                  <option value="payment">Payment Issue</option>
                  <option value="vehicle">Vehicle Problem</option>
                  <option value="driver">Driver Behavior</option>
                  <option value="damage">Cargo Damage</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <Label>Description</Label>
                <Textarea
                  placeholder="Describe your issue in detail..."
                  value={grievanceForm.description}
                  onChange={(e) =>
                    setGrievanceForm({ ...grievanceForm, description: e.target.value })
                  }
                  className="mt-2"
                  rows={5}
                />
              </div>

              <div>
                <Label>Upload Proof (Optional)</Label>
                <Button variant="outline" className="w-full justify-start mt-2">
                  <Upload className="w-4 h-4 mr-2" />
                  Select File
                </Button>
              </div>

              <Button className="w-full bg-indigo-600 hover:bg-indigo-700">
                Submit Complaint
              </Button>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="mb-4 text-gray-900">Your Complaints</h3>
            <div className="space-y-3">
              {complaints.map((complaint) => (
                <div key={complaint.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="text-gray-900">{complaint.id}</p>
                      <p className="text-gray-600 text-sm">{complaint.category}</p>
                      <p className="text-gray-500 text-xs mt-1">{complaint.date}</p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${
                        complaint.status === 'Resolved'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {complaint.status}
                    </span>
                  </div>
                  <Button variant="ghost" size="sm" className="w-full">
                    View Details
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="insurance" className="p-4 space-y-4">
          <Card className="p-6">
            <div className="flex items-center mb-4">
              <Shield className="w-8 h-8 text-indigo-600 mr-3" />
              <div>
                <h3 className="text-gray-900">Insurance Claims</h3>
                <p className="text-gray-600 text-sm">File a claim for insured loads</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label>Load ID</Label>
                <Input
                  placeholder="Enter load ID"
                  value={insuranceForm.loadId}
                  onChange={(e) =>
                    setInsuranceForm({ ...insuranceForm, loadId: e.target.value })
                  }
                  className="mt-2"
                />
              </div>

              <div>
                <Label>Claim Amount (₹)</Label>
                <Input
                  type="number"
                  placeholder="0"
                  value={insuranceForm.claimAmount}
                  onChange={(e) =>
                    setInsuranceForm({ ...insuranceForm, claimAmount: e.target.value })
                  }
                  className="mt-2"
                />
              </div>

              <div>
                <Label>Incident Description</Label>
                <Textarea
                  placeholder="Describe the incident..."
                  value={insuranceForm.description}
                  onChange={(e) =>
                    setInsuranceForm({ ...insuranceForm, description: e.target.value })
                  }
                  className="mt-2"
                  rows={4}
                />
              </div>

              <div>
                <Label>Supporting Documents</Label>
                <Button variant="outline" className="w-full justify-start mt-2">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Documents
                </Button>
              </div>

              <Button className="w-full bg-indigo-600 hover:bg-indigo-700">
                <FileText className="w-4 h-4 mr-2" />
                File Claim
              </Button>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="mb-4 text-gray-900">Active Policies</h3>
            <div className="space-y-3">
              {insurancePolicies.map((policy) => (
                <div key={policy.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="text-gray-900">{policy.id}</p>
                      <p className="text-gray-600 text-sm">Load: {policy.loadId}</p>
                      <p className="text-gray-500 text-xs mt-1">
                        Coverage: {policy.coverage}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${
                        policy.status === 'Active'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-orange-100 text-orange-700'
                      }`}
                    >
                      {policy.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
