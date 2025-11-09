import { motion } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';
import { Button } from './ui/button';
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter } from './ui/alert-dialog';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
}

export function SuccessModal({ isOpen, onClose, message }: SuccessModalProps) {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className="mx-auto mb-4"
          >
            <CheckCircle2 className="w-20 h-20 text-green-500" />
          </motion.div>
          <AlertDialogTitle className="text-center text-gray-900">
            {message}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center">
            Your action has been completed successfully.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button onClick={onClose} className="w-full bg-green-600 hover:bg-green-700">
            OK
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
