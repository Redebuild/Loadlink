import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { motion } from 'motion/react';
import { Truck } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';
import { languages as langConfig, Language } from '../lib/translations-extended';

interface LanguageSelectorProps {
  onContinue: () => void;
}

export function LanguageSelector({ onContinue }: LanguageSelectorProps) {
  const { language, setLanguage } = useLanguage();
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(language);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  const languageArray = Object.values(langConfig);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % languageArray.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [languageArray.length]);

  const handleContinue = () => {
    setLanguage(selectedLanguage);
    onContinue();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-500 via-blue-900 to-gray-800 flex flex-col items-center justify-between p-6 relative overflow-hidden">
      {/* India Map Pattern Background */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
          <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
            <path d="M 100 0 L 0 0 0 100" fill="none" stroke="white" strokeWidth="1"/>
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Animated Truck Icons */}
      <div className="absolute top-20 left-10 opacity-20">
        <Truck className="w-16 h-16 text-white" />
      </div>
      <div className="absolute bottom-40 right-20 opacity-20">
        <Truck className="w-12 h-12 text-white transform rotate-45" />
      </div>
      <div className="absolute top-1/3 right-10 opacity-20">
        <Truck className="w-14 h-14 text-white transform -rotate-12" />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-md z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <motion.h1
            key={currentTextIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            className="text-white mb-4 drop-shadow-lg"
          >
            {translations.selectYourLanguage[languageArray[currentTextIndex].code as Language]}
          </motion.h1>
          <p className="text-orange-200 text-sm">LoadLink – Connecting India's Roads</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="w-full bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl p-8"
        >
          <h2 className="text-gray-700 mb-6 text-center">{translations.chooseYourLanguage[selectedLanguage]}</h2>
          
          <Select value={selectedLanguage} onValueChange={(v) => setSelectedLanguage(v as Language)}>
            <SelectTrigger className="w-full h-14 text-lg mb-6">
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(langConfig).map(([code, lang]) => (
                <SelectItem key={code} value={code} className="text-lg py-3">
                  <span className="flex items-center gap-3">
                    <span className="text-2xl">{lang.flag}</span>
                    <span>{lang.nativeName}</span>
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            onClick={handleContinue}
            className="w-full h-12 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg rounded-xl"
          >
            {translations.continue[selectedLanguage]}
          </Button>
        </motion.div>
      </div>

      <motion.div
        className="relative w-full max-w-md mt-8 z-10"
        animate={{
          x: [0, 20, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="flex items-center justify-center">
          <Truck className="w-24 h-24 text-white" strokeWidth={1.5} />
          <motion.div
            className="absolute inset-0 bg-orange-400/30 blur-2xl rounded-full"
            animate={{
              opacity: [0.5, 0.2, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          />
        </div>
      </motion.div>
    </div>
  );
}
