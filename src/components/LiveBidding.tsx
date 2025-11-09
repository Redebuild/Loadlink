import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { ArrowLeft, MapPin, Package, Trophy, Timer } from 'lucide-react';
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogAction } from './ui/alert-dialog';
import { useLanguage } from '../lib/LanguageContext';

interface LiveBiddingProps {
  loadId: string;
  onBack: () => void;
}

export function LiveBidding({ loadId, onBack }: LiveBiddingProps) {
  const { t } = useLanguage();
  const [timeLeft, setTimeLeft] = useState(135); // 2:15 in seconds
  const [bidAmount, setBidAmount] = useState('');
  const [showWinnerModal, setShowWinnerModal] = useState(false);
  const [winner, setWinner] = useState('');
  
  const [bids, setBids] = useState([
    { id: 1, truck: 'MH-02-AB-1234', amount: 82000, time: '2m ago', isUser: false },
    { id: 2, truck: 'DL-01-XY-5678', amount: 83500, time: '5m ago', isUser: false },
    { id: 3, truck: 'KA-03-CD-9012', amount: 84000, time: '8m ago', isUser: false },
    { id: 4, truck: 'TN-09-EF-3456', amount: 84500, time: '12m ago', isUser: false },
  ]);

  const loadDetails = {
    id: loadId,
    from: 'Mumbai',
    to: 'Delhi',
    distance: '1,420 km',
    loadType: 'Electronics',
    weight: '15 tons',
    budget: '₹85,000',
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setWinner(bids[0].truck);
          setTimeout(() => setShowWinnerModal(true), 500);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [bids]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePlaceBid = () => {
    const amount = parseInt(bidAmount);
    if (amount && amount < bids[0].amount) {
      const newBid = {
        id: bids.length + 1,
        truck: 'Your Truck',
        amount: amount,
        time: 'Just now',
        isUser: true,
      };
      setBids([newBid, ...bids]);
      setBidAmount('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-orange-50">
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-4 shadow-lg">
        <Button variant="ghost" onClick={onBack} className="text-white hover:bg-green-700 mb-2 rounded-xl">
          <ArrowLeft className="w-4 h-4 mr-2" />
          {t('back')}
        </Button>
        <h2 className="text-white drop-shadow-sm">{t('liveBidding')}</h2>
        <div className="flex items-center gap-1 mt-1">
          <div className="w-1.5 h-1.5 bg-orange-400 rounded-full"></div>
          <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
          <div className="w-1.5 h-1.5 bg-orange-400 rounded-full"></div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        <Card className="p-4 shadow-lg rounded-xl border-2 border-green-100">
          <h3 className="mb-3 text-green-900">{t('loadDetails')}</h3>
          <div className="space-y-2">
            <div className="flex items-center text-gray-600 text-sm">
              <MapPin className="w-4 h-4 mr-2 text-green-600" />
              {loadDetails.from} → {loadDetails.to}
            </div>
            <div className="flex items-center text-gray-600 text-sm">
              <Package className="w-4 h-4 mr-2 text-green-600" />
              {loadDetails.loadType} • {loadDetails.weight}
            </div>
            <div className="flex items-center justify-between pt-2 border-t">
              <span className="text-gray-600 text-sm">{loadDetails.distance}</span>
              <span className="text-green-600">Budget: {loadDetails.budget}</span>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg rounded-xl border-2 border-orange-300">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Timer className="w-6 h-6 mr-3" strokeWidth={2} />
              <div>
                <p className="text-orange-100 text-sm">{t('auctionEndsIn')}</p>
                <p className="text-2xl drop-shadow-sm">{formatTime(timeLeft)}</p>
              </div>
            </div>
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="bg-white/30 px-4 py-2 rounded-xl shadow-md"
            >
              <p className="text-sm drop-shadow-sm">{t('live')}</p>
            </motion.div>
          </div>
        </Card>

        <Card className="p-4 shadow-lg rounded-xl border-2 border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-900">{t('currentBids')}</h3>
            <span className="text-gray-600 text-sm">{bids.length} {t('bids')}</span>
          </div>

          <div className="space-y-2 max-h-64 overflow-y-auto">
            <AnimatePresence>
              {bids.map((bid, index) => (
                <motion.div
                  key={bid.id}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-3 rounded-lg border ${
                    index === 0
                      ? 'bg-green-50 border-green-300'
                      : bid.isUser
                      ? 'bg-blue-50 border-blue-300'
                      : 'bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {index === 0 && <Trophy className="w-4 h-4 text-green-600 mr-2" />}
                      <div>
                        <p className={`text-sm ${bid.isUser ? 'text-blue-700' : 'text-gray-900'}`}>
                          {bid.truck}
                        </p>
                        <p className="text-xs text-gray-500">{bid.time}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`${index === 0 ? 'text-green-600' : 'text-gray-900'}`}>
                        ₹{bid.amount.toLocaleString()}
                      </p>
                      {index === 0 && (
                        <span className="text-xs text-green-600">{t('lowest')}</span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </Card>

        <Card className="p-4 shadow-lg rounded-xl border-2 border-green-100">
          <h3 className="mb-3 text-green-900">{t('placeYourBid')}</h3>
          <div className="flex gap-2">
            <div className="flex-1">
              <Input
                type="number"
                placeholder={t('enterBidAmount')}
                value={bidAmount}
                onChange={(e) => setBidAmount(e.target.value)}
                className="h-12 rounded-xl"
              />
            </div>
            <Button
              onClick={handlePlaceBid}
              className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 h-12 px-6 rounded-xl shadow-lg"
              disabled={!bidAmount || parseInt(bidAmount) >= bids[0].amount}
            >
              {t('placeBid')}
            </Button>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            {t('bidMustBeLower')} ₹{bids[0].amount.toLocaleString()}
          </p>
        </Card>
      </div>

      <AlertDialog open={showWinnerModal} onOpenChange={setShowWinnerModal}>
        <AlertDialogContent className="rounded-xl">
          <AlertDialogHeader>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="mx-auto mb-4"
            >
              <Trophy className="w-16 h-16 text-yellow-500" />
            </motion.div>
            <AlertDialogTitle className="text-center">{t('bidClosed')}</AlertDialogTitle>
            <AlertDialogDescription className="text-center">
              <p className="mb-2">{t('winner')}: <strong>{winner}</strong></p>
              <p>{t('finalBid')}: ₹{bids[0].amount.toLocaleString()}</p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={onBack} className="rounded-xl">{t('ok')}</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
