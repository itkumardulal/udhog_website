import { useTranslation } from '../context/TranslationContext';
import Message from './Message';
import udhog from '../../src/assets/udhog.jpg';

function About() {
  const { t, language } = useTranslation(); // language = 'en' or 'np'

  return (
    <>
      <section className="bg-gray-100 py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-12">
            {/* Text Content */}
            <div className="max-w-2xl space-y-6">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                {t('about')}
              </h2>

              <div className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed space-y-6">
                {/* Goal */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-1">{t('goalTitle')}</h3>
                  <p>{t('goal')}</p>
                </div>

                {/* Vision */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-1">{t('visionTitle')}</h3>
                  <p>{t('vision')}</p>
                </div>

                {/* Quality Policy */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-1">{t('qualityTitle')}</h3>
                  <p>{t('quality')}</p>
                </div>
              </div>
            </div>

            {/* Image */}
            <div className="flex justify-center">
              <img
                src={udhog}
                alt="About Us"
                className="rounded-xl shadow-xl object-cover w-full max-w-lg hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </section>

      <Message />
    </>
  );
}

export default About;
