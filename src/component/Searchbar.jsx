import { useTranslation } from '../context/TranslationContext';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function SearchBar() {
  const { t } = useTranslation();
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();

    if (!query.trim()) {
      toast.error(t('searchRequired') || 'Please enter a company name.');
      return;
    }

    navigate(`/table?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-800 w-full flex justify-center items-center py-4">
      <form onSubmit={handleSearch} className="w-full max-w-6xl flex items-center justify-center">
        <div className="relative w-full">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            name="q"
            className="w-full border h-16 shadow-md p-4 pr-52 rounded-full dark:text-gray-800 dark:border-gray-700 dark:bg-gray-200 text-lg"
            placeholder={t('search')}
          />

          <button
            type="submit"
            className="hidden lg:block absolute top-1.5 right-1.5 h-13 px-8 bg-teal-500 text-white rounded-full hover:bg-teal-600 transition duration-200 text-lg font-medium"
          >
            {t('searchCompany')}
          </button>

          <button
            type="submit"
            className="lg:hidden absolute top-1.5 right-1.5 h-12 w-12 bg-teal-500 text-white rounded-full hover:bg-teal-600 transition duration-200 flex items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1011.5 19.5a7.5 7.5 0 005.15-2.85z"
              />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
}

export default SearchBar;
