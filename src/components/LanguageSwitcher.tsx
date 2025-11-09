import { Globe, Check } from 'lucide-react';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { ScrollArea } from './ui/scroll-area';
import { useLanguage } from '../lib/LanguageContext';
import { languages, Language } from '../lib/translations-extended';

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
  };

  const currentLang = languages[language];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="fixed top-3 right-3 sm:top-4 sm:right-4 z-[100] bg-white shadow-lg hover:shadow-xl transition-shadow gap-1 sm:gap-2 h-8 sm:h-10 px-2 sm:px-3 border-2"
        >
          <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span className="text-base sm:text-xl">{currentLang.flag}</span>
          <span className="hidden md:inline text-xs sm:text-sm max-w-[80px] truncate">{currentLang.nativeName}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" sideOffset={8} className="w-64 sm:w-72 mr-3 sm:mr-4 z-[100]">
        <DropdownMenuLabel className="flex items-center gap-2">
          <Globe className="w-4 h-4" />
          Select Language
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <ScrollArea className="h-64 sm:h-80">
          {Object.entries(languages).map(([code, lang]) => (
            <DropdownMenuItem
              key={code}
              onClick={() => handleLanguageChange(code as Language)}
              className={`cursor-pointer ${
                language === code ? 'bg-orange-50' : ''
              }`}
              dir={lang.dir}
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2 sm:gap-3">
                  <span className="text-lg sm:text-xl">{lang.flag}</span>
                  <div className="flex flex-col items-start">
                    <span className="text-sm sm:text-base text-gray-900">{lang.nativeName}</span>
                    <span className="text-xs text-gray-500">{lang.name}</span>
                  </div>
                </div>
                {language === code && (
                  <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-600" />
                )}
              </div>
            </DropdownMenuItem>
          ))}
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
