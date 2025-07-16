import img from '../assets/chaiperson.JPG'
import { useTranslation } from '../context/TranslationContext';

function Message (){
        const { t } = useTranslation();
    return (
        <>
        
      <section className="bg-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
           <h2 className="text-4xl font-bold text-gray-900 mb-6 text-center">{t('message')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-12">
            {/* Image */}
            <div className="flex justify-center">
              <img
                src={img}
                alt="Message Image"
                className="rounded-xl shadow-xl object-cover w-full max-w-lg hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Text Content */}
            <div className="max-w-2xl">
             
              <p className="text-gray-700 text-lg leading-relaxed space-y-4">
                <span>
                 {t('message1')}
                </span>
                <br />
                 <span>
                 {t('message2')}
                </span>
                 <span>
                  <br/>
                 {t('message3')}
                </span>
                <br />
                {/* <span>
                  {t('message4')}
                </span> */}
              </p>

              <div className="mt-8">
                <p className="text-gray-900 font-extrabold text-xl">{t('warmRegards')}</p>
                <p className="text-gray-600 font-medium text-lg">{t('name')}</p>
                <p className="text-gray-600 font-medium text-lg">{t('chairPerson')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
        </>
    )
}

export default Message