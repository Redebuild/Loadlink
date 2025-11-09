import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Check, Globe } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';
import { Language, languages } from '../lib/translations-extended';

const languageOrder: Language[] = [
  'en', 'hi', 'bn', 'ta', 'te', 'mr', 'gu', 'kn', 'ml', 'or', 'pa', 'ur', 
  'as', 'ks', 'mai', 'doi', 'kok', 'mni', 'sat', 'brx', 'sd', 'lus', 'trp'
];

export function EnhancedLanguageSelector({ onComplete }: { onComplete?: () => void }) {
  const { language, setLanguage, t } = useLanguage();
  const [currentPreviewIndex, setCurrentPreviewIndex] = useState(0);

  // Rotating language preview animation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPreviewIndex((prev) => (prev + 1) % languageOrder.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleLanguageSelect = (lang: Language) => {
    setLanguage(lang);
    if (onComplete) {
      setTimeout(onComplete, 500);
    }
  };

  const getCurrentPreviewText = () => {
    const lang = languageOrder[currentPreviewIndex];
    const langInfo = languages[lang];
    return {
      showEnglishText: lang === 'en',
      native: langInfo.nativeName,
      lang: langInfo.name,
    };
  };

  const preview = getCurrentPreviewText();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50 flex flex-col items-center justify-center p-6">
      {/* Rotating Language Preview */}
      <div className="mb-8 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Globe className="w-6 h-6 sm:w-8 sm:h-8 text-orange-600" />
          <div className="h-16 sm:h-20 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPreviewIndex}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center justify-center"
              >
                {preview.showEnglishText && (
                  <div className="text-base sm:text-xl text-gray-700 mb-1">
                    Select your language
                  </div>
                )}
                <div 
                  className="text-xl sm:text-3xl text-orange-600"
                  style={{ 
                    direction: languages[languageOrder[currentPreviewIndex]].dir,
                  }}
                >
                  {preview.native}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        <p className="text-xs sm:text-sm text-gray-500">
          {preview.lang}
        </p>
      </div>

      {/* Main Language Selector Card */}
      <Card className="w-full max-w-4xl p-8 shadow-2xl">
        <h2 className="text-3xl text-center mb-2 text-gray-900">
          {t('selectYourLanguage')}
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Choose your preferred language to continue
        </p>

        {/* Language Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-6">
          {languageOrder.map((lang) => {
            const langInfo = languages[lang];
            const isSelected = language === lang;

            return (
              <motion.div
                key={lang}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  type="button"
                  variant={isSelected ? 'default' : 'outline'}
                  className={`
                    w-full h-auto py-4 px-4 flex flex-col items-center gap-2 relative
                    ${isSelected 
                      ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white border-orange-600 shadow-lg' 
                      : 'hover:border-orange-300 hover:bg-orange-50'
                    }
                    transition-all duration-200
                  `}
                  onClick={() => handleLanguageSelect(lang)}
                  dir={langInfo.dir}
                >
                  {isSelected && (
                    <div className="absolute top-2 right-2">
                      <Check className="w-4 h-4" />
                    </div>
                  )}
                  
                  <span className="text-2xl">{langInfo.flag}</span>
                  <div className="text-center w-full">
                    <div 
                      className={`font-semibold text-base ${
                        isSelected ? 'text-white' : 'text-gray-900'
                      }`}
                      style={{ direction: langInfo.dir }}
                    >
                      {langInfo.nativeName}
                    </div>
                    <div className={`text-xs ${
                      isSelected ? 'text-orange-100' : 'text-gray-500'
                    }`}>
                      {langInfo.name}
                    </div>
                  </div>
                </Button>
              </motion.div>
            );
          })}
        </div>
      </Card>

      {/* Bottom Info */}
      <div className="mt-6 text-center text-sm text-gray-500">
        <p>🇮🇳 Supporting 23 Indian Languages</p>
        <p className="mt-1">{t('poweredBy')}</p>
      </div>
    </div>
  );
}
