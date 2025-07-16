import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "../context/TranslationContext";

const Footer = () => {
  const { t } = useTranslation();

  // Dynamic rights text with year replacement
  const rightsText = t("footerRights").replace(
    "{year}",
    new Date().getFullYear()
  );

  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8">
      <div className="container mx-auto px-4">
        {/* Footer Grid */}
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-8 mb-8"> */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-8 mb-8">
          
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center">
              <span className="ml-2 text-xl font-bold">
                {t("footerCompanyName")}
              </span>
            </div>
            <p className="text-gray-400">{t("footerTagline")}</p>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/sindhulicci2025"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition"
              >
                <span className="sr-only">Facebook</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{t("footerQuickLinks")}</h3>
            <ul className="space-y-2">
              {Object.entries(t("quickLinks")).map(([key, name]) => (
                <li key={key}>
                  <Link
                    to={`/${key === "home" ? "" : key}`}
                    className="text-gray-400 hover:text-white transition"
                  >
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{t("footerResources")}</h3>
            <ul className="space-y-2">
              {Object.entries(t("resourcesList")).map(([key, name]) => (
                <li key={key}>
                  <Link
                    to={`/${key}`}
                    className="text-gray-400 hover:text-white transition"
                  >
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Branches */}
          {/* <div className="space-y-4">
            <h3 className="text-lg font-semibold">{t("branches")}</h3>
            <ul className="space-y-2">
              {Object.entries(t("branchesList")).map(([key, name]) => (
                <li key={key}>
                  <Link
                    to={`/branch/${key}`}
                    className="text-gray-400 hover:text-white transition"
                  >
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div> */}

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{t("footerContactUs")}</h3>
            <address className="not-italic text-gray-400">
              <p>{t("footerAddressLine1")}</p>
              <p className="mt-2">
                {t("footerEmail")}:{" "}
                <a
                  href="mailto:sindhulicci@gmail.com"
                  className="hover:text-white transition"
                >
                  sindhulicci@gmail.com
                </a>
              </p>
              <p>
                {t("footerPhone")}: {t("footerPhoneNumber")}
              </p>
            </address>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-6 flex justify-center items-center">
          <p className="text-gray-500 text-sm text-center">{rightsText}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
