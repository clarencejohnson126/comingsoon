import React from 'react';
import { Languages } from 'lucide-react';
import { Language } from '../utils/translations';

interface LanguageToggleProps {
  currentLanguage: Language;
  onLanguageChange: (language: Language) => void;
}

const LanguageToggle: React.FC<LanguageToggleProps> = ({ currentLanguage, onLanguageChange }) => {
  return (
    <div className="flex items-center gap-1">
      <Languages className="w-4 h-4 text-orange-400" />
      <div className="flex bg-black/30 rounded-md overflow-hidden border border-orange-500/30">
        <button
          onClick={() => onLanguageChange('en')}
          className={`px-2 py-1 text-xs font-mono transition-all duration-200 ${
            currentLanguage === 'en'
              ? 'bg-orange-500 text-black font-bold'
              : 'text-orange-400 hover:text-orange-300'
          }`}
        >
          EN
        </button>
        <button
          onClick={() => onLanguageChange('de')}
          className={`px-2 py-1 text-xs font-mono transition-all duration-200 ${
            currentLanguage === 'de'
              ? 'bg-orange-500 text-black font-bold'
              : 'text-orange-400 hover:text-orange-300'
          }`}
        >
          DE
        </button>
      </div>
    </div>
  );
};

export default LanguageToggle;