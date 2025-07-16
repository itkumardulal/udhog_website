import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from '../context/TranslationContext';

function LanguageSwitcher() {
  const { language, setLanguage } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const languages = [
    { code: 'en', label: 'ENG', flag: 'https://flagcdn.com/w40/gb.png' },
    { code: 'np', label: 'नेपा', flag: 'https://flagcdn.com/w40/np.png' },
  ];

  const selectedLanguage = languages.find((lang) => lang.code === language);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center bg-indigo-100 border border-indigo-300 px-3 py-2 rounded-full focus:outline-none hover:bg-indigo-200 hover:shadow-lg transition-all duration-200 transform hover:scale-105 active:scale-95"
      >
        <img src={selectedLanguage.flag} alt={selectedLanguage.label} className="h-5 w-7 mr-2 rounded" />
        <span className="text-sm font-medium text-indigo-700">{selectedLanguage.label}</span>
        <svg className="ml-2 h-4 w-4 text-indigo-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-36 bg-white border border-gray-200 rounded-lg shadow-xl z-50 transition-all">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setLanguage(lang.code);
                setIsOpen(false);
              }}
              className={`flex items-center w-full px-3 py-2 text-left hover:bg-indigo-100 transition-all duration-150 ${
                lang.code === language ? 'bg-indigo-100 font-semibold text-indigo-700' : 'text-gray-700'
              }`}
            >
              <img src={lang.flag} alt={lang.label} className="h-4 w-6 mr-2 rounded" />
              <span className="text-sm">{lang.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default LanguageSwitcher;


//नेपाली