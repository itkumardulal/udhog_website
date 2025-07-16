import { useTranslation } from '../context/TranslationContext';
import Footer from './footer';
import Navbar from './Navbar';

const WhyMembership = () => {
  const { t } = useTranslation();

  return (
    <>
    <Navbar/>
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-md leading-relaxed">
      <h1 className="text-3xl font-bold text-indigo-700 mb-4">{t('title12')}</h1>

      <ul className="list-disc ml-6 space-y-2">
        <li>{t('point1')}</li>
        <li>{t('point2')}</li>
        <li>{t('point3')}</li>
        <li>{t('point4')}</li>
        <li>{t('point5')}</li>
        <li>{t('point6')}</li>
        <li>{t('point7')}</li>
        <li>{t('point8')}</li>
        <li>{t('point9')}</li>
        <li>{t('point10')}</li>
        <li>{t('point11')}</li>
        <li>{t('point12')}</li>
        <li>{t('point13')}</li>
        <li>{t('point14')}</li>
        <li>{t('point15')}</li>
        <li>{t('point16')}</li>
        <li>{t('point17')}</li>
      </ul>

      <h2 className="text-2xl font-semibold text-indigo-600 mt-6 mb-2">{t('whoCanJoinTitle')}</h2>
      <p>{t('whoCanJoin')}</p>

      <h2 className="text-2xl font-semibold text-indigo-600 mt-6 mb-2">{t('howToJoinTitle')}</h2>
      <ul className="list-disc ml-6 space-y-2">
        <li>{t('doc1')}</li>
        <li>{t('doc2')}</li>
        <li>{t('doc3')}</li>
        <li>{t('doc4')}</li>
        <li>{t('doc5')}</li>
        <li>{t('doc6')}</li>
      </ul>

      <h2 className="text-xl font-semibold text-indigo-600 mt-6 mb-2">{t('benefitsTitle')}</h2>
      <ul className="list-disc ml-6 space-y-2">
        <li>{t('benefit1')}</li>
        <li>{t('benefit2')}</li>
        <li>{t('benefit3')}</li>
      </ul>

      <p className="mt-6 font-semibold text-green-700">{t('callToAction')}</p>
    </div>
    <Footer/>
    </>
  );
};

export default WhyMembership;
