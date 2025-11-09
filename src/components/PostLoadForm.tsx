import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card } from './ui/card';
import { Checkbox } from './ui/checkbox';
import { ArrowLeft, MapPin, Calendar, Package, Weight, DollarSign } from 'lucide-react';

interface PostLoadFormProps {
  onSubmit: () => void;
  onBack: () => void;
}

export function PostLoadForm({ onSubmit, onBack }: PostLoadFormProps) {
  const [formData, setFormData] = useState({
    pickup: '',
    drop: '',
    date: '',
    loadType: '',
    weight: '',
    budget: '',
    insurance: false,
  });

  const updateField = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = () => {
    onSubmit();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-6">
      <Button variant="ghost" onClick={onBack} className="mb-4">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back
      </Button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto"
      >
        <h2 className="mb-6 text-center text-gray-900">Post New Load</h2>

        <div className="space-y-4">
          <Card className="p-6">
            <div className="space-y-4">
              <div>
                <Label>Pickup Location</Label>
                <div className="relative mt-2">
                  <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Enter pickup address"
                    value={formData.pickup}
                    onChange={(e) => updateField('pickup', e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <Label>Drop Location</Label>
                <div className="relative mt-2">
                  <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Enter drop address"
                    value={formData.drop}
                    onChange={(e) => updateField('drop', e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="space-y-4">
              <div>
                <Label>Pickup Date</Label>
                <div className="relative mt-2">
                  <Calendar className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input
                    type="date"
                    value={formData.date}
                    onChange={(e) => updateField('date', e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <Label>Load Type</Label>
                <div className="relative mt-2">
                  <Package className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <select
                    className="w-full h-10 px-10 rounded-md border border-gray-300"
                    value={formData.loadType}
                    onChange={(e) => updateField('loadType', e.target.value)}
                  >
                    <option value="">Select load type</option>
                    <option value="general">General Cargo</option>
                    <option value="electronics">Electronics</option>
                    <option value="food">Food Items</option>
                    <option value="furniture">Furniture</option>
                    <option value="chemicals">Chemicals</option>
                    <option value="machinery">Machinery</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Weight (tons)</Label>
                  <div className="relative mt-2">
                    <Weight className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <Input
                      type="number"
                      placeholder="0"
                      value={formData.weight}
                      onChange={(e) => updateField('weight', e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div>
                  <Label>Budget (₹)</Label>
                  <div className="relative mt-2">
                    <DollarSign className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <Input
                      type="number"
                      placeholder="0"
                      value={formData.budget}
                      onChange={(e) => updateField('budget', e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-start space-x-3">
              <Checkbox
                id="insurance"
                checked={formData.insurance}
                onCheckedChange={(checked) => updateField('insurance', checked)}
              />
              <div className="flex-1">
                <label htmlFor="insurance" className="text-sm text-gray-900 cursor-pointer">
                  {t('addInsuranceCoverage')}
                </label>
                <p className="text-xs text-gray-600 mt-1">
                  {t('insuranceDescription')}
                </p>
              </div>
            </div>
          </Card>

          <Button
            onClick={handleSubmit}
            className="w-full h-12 bg-blue-600 hover:bg-blue-700"
            disabled={!formData.pickup || !formData.drop || !formData.date || !formData.loadType}
          >
            {t('startBidding')}
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
