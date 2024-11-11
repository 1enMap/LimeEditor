import React from 'react';
import { Languages } from 'lucide-react';
import type { Language } from '../types';

interface TranslateButtonProps {
  isTranslating: boolean;
  hasSelection: boolean;
  onTranslate: () => void;
  targetLang: Language;
  setTargetLang: (lang: Language) => void;
}

const TranslateButton: React.FC<TranslateButtonProps> = ({
  isTranslating,
  hasSelection,
  onTranslate,
  targetLang,
  setTargetLang,
}) => {
  const languages: { value: Language; label: string }[] = [
    { value: 'hi', label: 'Hindi' },
    { value: 'es', label: 'Spanish' },
    { value: 'fr', label: 'French' },
    { value: 'de', label: 'German' },
  ];

  return (
    <div className="flex items-center gap-2 relative group">
      <select
        value={targetLang}
        onChange={(e) => setTargetLang(e.target.value as Language)}
        className={`bg-white border border-gray-300 rounded px-2 py-1 text-sm
          disabled:opacity-50 disabled:cursor-not-allowed`}
        disabled={isTranslating}
      >
        {languages.map((lang) => (
          <option key={lang.value} value={lang.value}>
            {lang.label}
          </option>
        ))}
      </select>
      <button
        onClick={onTranslate}
        disabled={isTranslating || !hasSelection}
        className={`flex items-center gap-1 px-3 py-1 bg-blue-500 text-white rounded 
          hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors
          relative`}
      >
        <Languages size={16} />
        <span>{isTranslating ? 'Translating...' : 'Translate'}</span>
      </button>
      {!hasSelection && (
        <div className="absolute invisible group-hover:visible -top-8 left-1/2 -translate-x-1/2 
          whitespace-nowrap bg-gray-800 text-white text-xs py-1 px-2 rounded">
          Select text to translate
        </div>
      )}
    </div>
  );
};

export default TranslateButton;