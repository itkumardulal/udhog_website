import React from 'react';
import { useTranslation } from '../context/TranslationContext';

const Contact = () => {
  const { t } = useTranslation();
  return (
    <>
      <section className="bg-gray-100">
        <div className="max-w-7xl mx-auto py-2 px-6 sm:px-8 lg:py-25 lg:px-10"> 
          <div className="max-w-2xl lg:max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-extrabold text-gray-900">{t('location')}</h2> 
            <p className="mt-4 text-xl text-gray-500"> 
              
            </p>
          </div>
          <div className="mt-20 lg:mt-24"> 
  <div className="grid grid-cols-1 md:grid-cols-2 gap-24"> 
    <div className="rounded-lg overflow-hidden">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3548.268496635026!2d85.909309823867!3d27.21071880000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb8ca0f8fbc1e5%3A0xe626b019fadee02!2sSindhuli%20Chamber%20of%20Commerce%20and%20Industry!5e0!3m2!1sen!2snp!4v1750230010349!5m2!1sen!2snp"
        width="100%"
        height="520"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        title="Google Maps Location"
      ></iframe>
    </div>
    <div>
      <div className="max-w-full mx-auto rounded-lg overflow-hidden shadow-lg">
        <div className="px-8 py-6">
          <h3 className="text-xl font-semibold text-gray-900">{t('ourAddress')}</h3>
          <p className="mt-2 text-gray-700">{t('footerAddressLine1')}</p>
        </div>
        <div className="border-t border-gray-300 px-8 py-6">
          <h3 className="text-xl font-semibold text-gray-900">{t('hours')}</h3>
          <p className="mt-2 text-gray-700">{t('open')}</p>
          <p className="mt-2 text-gray-700">{t('close')}</p>
        </div>
        <div className="border-t border-gray-300 px-8 py-6">
          <h3 className="text-xl font-semibold text-gray-900">{t('contact')}</h3>
          <p className="mt-2 text-gray-700">sindhulicci@gmail.com</p>
          <p className="mt-2 text-gray-700">{t('telephone')}: {t('footerPhoneNumber')}</p>
        </div>
      </div>
    </div>
  </div>
</div>

        </div>
      </section>
    </>
  );
};

export default Contact;
