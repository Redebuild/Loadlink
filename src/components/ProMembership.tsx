import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { ArrowLeft, Check, Crown, Zap, Shield, Headphones } from 'lucide-react';

interface ProMembershipProps {
  onBack: () => void;
}

export function ProMembership({ onBack }: ProMembershipProps) {
  const [selectedPlan, setSelectedPlan] = useState<'free' | 'silver' | 'gold'>('free');

  const plans = [
    {
      id: 'free' as const,
      name: 'Free',
      price: '₹0',
      period: 'Forever',
      color: 'bg-gray-500',
      features: [
        'Post up to 5 loads/month',
        'Basic tracking',
        'Email support',
        'Standard verification',
      ],
    },
    {
      id: 'silver' as const,
      name: 'Silver',
      price: '₹199',
      period: '/month',
      color: 'bg-gray-400',
      icon: Crown,
      popular: false,
      features: [
        'Unlimited load posting',
        'Early bidding access (5 min)',
        'Priority support',
        'Advanced tracking',
        'Lower platform fees (2%)',
        'Insurance discounts',
      ],
    },
    {
      id: 'gold' as const,
      name: 'Gold',
      price: '₹399',
      period: '/month',
      color: 'bg-yellow-500',
      icon: Crown,
      popular: true,
      features: [
        'All Silver features',
        'Early bidding access (15 min)',
        '24×7 priority support',
        'Dedicated account manager',
        'Lowest platform fees (1%)',
        'Premium insurance coverage',
        'Featured load listings',
        'Advanced analytics',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-4">
        <Button variant="ghost" onClick={onBack} className="text-white hover:bg-white/20 mb-2">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <h2 className="text-white">Pro Membership</h2>
        <p className="text-purple-100 text-sm">Unlock premium features</p>
      </div>

      <div className="p-4 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            const isActive = selectedPlan === plan.id;
            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
              >
                <Card
                  className={`p-6 cursor-pointer transition-all relative ${
                    isActive ? 'ring-2 ring-purple-600 shadow-xl' : ''
                  } ${plan.popular ? 'border-yellow-500 border-2' : ''}`}
                  onClick={() => setSelectedPlan(plan.id)}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs px-4 py-1 rounded-full">
                        ⭐ Most Popular
                      </span>
                    </div>
                  )}

                  <div className="text-center mb-6">
                    {Icon && (
                      <div className={`${plan.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                    )}
                    <h3 className="text-gray-900 mb-2">{plan.name}</h3>
                    <div className="flex items-baseline justify-center">
                      <span className="text-3xl text-gray-900">{plan.price}</span>
                      <span className="text-gray-600 text-sm ml-1">{plan.period}</span>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start">
                        <Check className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button
                    className={`w-full ${
                      isActive
                        ? 'bg-purple-600 hover:bg-purple-700'
                        : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
                    }`}
                    disabled={plan.id === 'free'}
                  >
                    {plan.id === 'free' ? 'Current Plan' : 'Upgrade Now'}
                  </Button>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <Card className="p-6 bg-gradient-to-r from-purple-50 to-indigo-50">
          <h3 className="mb-4 text-gray-900">Why Go Pro?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start">
              <div className="bg-purple-600 p-2 rounded-lg mr-3">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-gray-900 text-sm">Early Bidding</p>
                <p className="text-gray-600 text-xs">Get exclusive access before others</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-purple-600 p-2 rounded-lg mr-3">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-gray-900 text-sm">Lower Fees</p>
                <p className="text-gray-600 text-xs">Save more on every transaction</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-purple-600 p-2 rounded-lg mr-3">
                <Headphones className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-gray-900 text-sm">Priority Support</p>
                <p className="text-gray-600 text-xs">24×7 dedicated assistance</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-purple-600 p-2 rounded-lg mr-3">
                <Crown className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-gray-900 text-sm">Premium Features</p>
                <p className="text-gray-600 text-xs">Access exclusive tools</p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="mb-4 text-gray-900">Frequently Asked Questions</h3>
          <div className="space-y-4">
            <div>
              <p className="text-gray-900 text-sm">Can I cancel anytime?</p>
              <p className="text-gray-600 text-xs mt-1">
                Yes, you can cancel your subscription at any time. No questions asked.
              </p>
            </div>
            <div>
              <p className="text-gray-900 text-sm">What payment methods are accepted?</p>
              <p className="text-gray-600 text-xs mt-1">
                We accept all major credit cards, debit cards, UPI, and net banking.
              </p>
            </div>
            <div>
              <p className="text-gray-900 text-sm">Is there a refund policy?</p>
              <p className="text-gray-600 text-xs mt-1">
                Yes, we offer a 7-day money-back guarantee if you're not satisfied.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
