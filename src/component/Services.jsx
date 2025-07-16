import { useTranslation } from "../context/TranslationContext";

function Services() {
  const { language, t } = useTranslation();

  const serviceTitles = t('servicesTitle');
  const serviceDescriptions = t('servicesDescription');

 
  const services = Object.keys(serviceTitles).map((key, index) => ({
    id: index + 1,
    title: serviceTitles[key],
    description: serviceDescriptions[key]
  }));

  return (
    <>
      <div className=" flex flex-col">
        <main className="flex-grow container mx-auto pb-8 px-6 pt-4">
          <h1 className="text-4xl font-bold  mb-12 animate-fade-in ">
            {t('ourServices')}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {services.map((service, index) => (
              <div
                key={service.id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transform transition-all duration-300 hover:scale-105 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <h2 className="text-2xl font-bold text-indigo-900 dark:text-indigo-400 mb-3">
                  {service.title}
                </h2>
                <p className="text-gray-700 dark:text-gray-400 text-base leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </main>
        
      </div>
    </>
  );
}

export default Services;
