import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../context/TranslationContext';
import LanguageSwitcher from './LanguageSwitcher';
import SearchBar from './Searchbar';
import logo5 from '../assets/logo5.png';

const navItems = [
  { path: '/', label: 'home' },
  {
    label: 'resources',
    dropdown: [
      { path: '/history', label: 'history' },
      { path: '/news', label: 'news' },
      { path: '/notices', label: 'notices' },
      { path: '/table', label: 'companyTitle' },
    ],
  },
  { path: '/services', label: 'services' },
  { path: '/about', label: 'about' },
  { path: '/contact', label: 'contact' },
  // { path: '/policy', label: 'policy' },
  { path: '/choose-us', label: 'membership' },
  // {
  //   label: 'branches',
  //   dropdown: [
  //     { path: '/branch/marin', label: 'Marin' },
  //     { path: '/branch/sunkoshi', label: 'SunKoshi' },
  //     { path: '/branch/fikal', label: 'Fikal' },
  //     { path: '/branch/golanjor', label: 'Golanjor' },
  //     { path: '/branch/chakmake', label: 'Chakmake' },
  //     { path: '/branch/hariharpurGadhi', label: 'HariharpurGadhi' },
  //   ],
  // },
];

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const { t } = useTranslation();

  const toggleDropdown = (label) => {
    setOpenDropdown((prev) => (prev === label ? null : label));
  };

  return (
    <>
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-18 px-2 lg:px-4">
            {/* Logo */}
            <Link to="/">
              <div className="flex items-center flex-shrink-0 mr-4 lg:ml-[-76px]">
                <img className="h-16 w-auto" src={logo5} alt="Logo" />
              </div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex space-x-4 whitespace-nowrap flex-grow justify-center">
              {navItems.map((item) =>
                item.dropdown ? (
                  <div key={item.label} className="relative group">
                    <button
                      className="text-gray-900 hover:bg-gray-100 px-3 py-2 rounded-md text-base font-medium flex items-center"
                    >
                      {t(item.label)}
                      <svg
                        className="ml-1 h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 20"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        />
                      </svg>
                    </button>
                    <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                      <ul className="p-4 space-y-2">
                        {item.dropdown.map((subItem) => (
                          <li key={subItem.label}>
                            <Link
                              to={subItem.path}
                              className="text-gray-600 hover:text-indigo-600 block text-base"
                            >
                              {t(subItem.label)}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : (
                  <Link
                    key={item.label}
                    to={item.path}
                    className="text-gray-900 hover:bg-gray-100 px-3 py-2 rounded-md text-base font-medium"
                  >
                    {t(item.label)}
                  </Link>
                )
              )}
            </div>

            {/* Right icons */}
            <div className="flex items-center space-x-2">
              {/* Language Switcher */}
              <div className="hidden lg:flex lg:ml-auto lg:mr-[-8px]">
                <LanguageSwitcher />
              </div>

              {/* Mobile menu button */}
              <div className="lg:hidden">
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="inline-flex items-center justify-center p-2 rounded-md text-black hover:text-black hover:bg-gray-100"
                  aria-label="Toggle menu"
                >
                  {isMobileMenuOpen ? (
                    <svg
                      className="block h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="black"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="block h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="black"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) =>
              item.dropdown ? (
                <div key={item.label}>
                  <button
                    onClick={() => toggleDropdown(item.label)}
                    className="w-full text-left text-gray-900 hover:bg-gray-100 px-3 py-2 rounded-md text-lg font-medium flex justify-between"
                  >
                    {t(item.label)}
                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  {openDropdown === item.label && (
                    <div className="px-4 py-2 border-l-2 border-indigo-500">
                      <ul className="space-y-2">
                        {item.dropdown.map((subItem) => (
                          <li key={subItem.label}>
                            <Link
                              to={subItem.path}
                              className="text-gray-600 hover:text-indigo-600 block text-lg"
                            >
                              {t(subItem.label)}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.label}
                  to={item.path}
                  className="text-gray-900 hover:bg-gray-100 block px-3 py-2 rounded-md text-lg font-medium"
                >
                  {t(item.label)}
                </Link>
              )
            )}

            {/* Language Switcher in Mobile */}
            <div className="mt-4 px-3 ">
              <LanguageSwitcher />
            </div>
          </div>
        )}
      </nav>

      {/* Search Bar */}
      <SearchBar />
    </>
  );
}

export default Navbar;
