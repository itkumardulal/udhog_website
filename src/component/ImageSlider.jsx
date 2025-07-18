import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from '../context/TranslationContext';
import { useNavigate } from 'react-router-dom';

function ImageSlider() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [currentSlide, setCurrentSlide] = useState(0);
  const [visibleSlides, setVisibleSlides] = useState(1);
  const [slidePercentage, setSlidePercentage] = useState(100);

  const membersPhoto = t('membersPhoto', { returnObjects: true }) || [];
  const baseImageUrl =
    'https://raw.githubusercontent.com/itkumardulal/Udhog-Photo/main/Sindhuli%20Members/';

  const slideInterval = useRef(null);

  useEffect(() => {
    updateVisibleSlides();
    window.addEventListener('resize', updateVisibleSlides);

    startAutoPlay();

    return () => {
      window.removeEventListener('resize', updateVisibleSlides);
      stopAutoPlay();
    };
  }, [visibleSlides, currentSlide]);

  const updateVisibleSlides = () => {
    if (window.innerWidth < 768) {
      setVisibleSlides(1);
      setSlidePercentage(100);
    } else {
      setVisibleSlides(3);
      setSlidePercentage(100 / 3);
    }
  };

  const startAutoPlay = () => {
    stopAutoPlay(); // clear any existing interval

    slideInterval.current = setInterval(() => {
      setCurrentSlide((prev) => {
        // Infinite loop logic
        if (prev >= membersPhoto.length - visibleSlides) {
          return 0;
        }
        return prev + 1;
      });
    }, 3000); 
  };

  const stopAutoPlay = () => {
    if (slideInterval.current) {
      clearInterval(slideInterval.current);
    }
  };

  const next = () => {
    stopAutoPlay();
    setCurrentSlide((prev) => (prev >= membersPhoto.length - visibleSlides ? 0 : prev + 1));
    startAutoPlay();
  };

  const prev = () => {
    stopAutoPlay();
    setCurrentSlide((prev) => (prev <= 0 ? membersPhoto.length - visibleSlides : prev - 1));
    startAutoPlay();
  };

  const goTo = (index) => {
    stopAutoPlay();
    const max = membersPhoto.length - visibleSlides;
    setCurrentSlide(index > max ? max : index);
    startAutoPlay();
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-lg mx-auto mb-8 text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">{t('members1')}</h2>
      </div>

      <div className="relative">
        <div className="relative overflow-hidden rounded-2xl shadow-xl bg-white">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * slidePercentage}%)` }}
          >
            {membersPhoto.map((member, index) => (
              <div
                key={index}
                className="w-full md:w-1/3 flex-shrink-0 px-3 py-6"
                style={{ width: `${slidePercentage}%` }}
              >
                <div className="rounded-2xl overflow-hidden bg-white border shadow-md hover:shadow-xl transition duration-300 ease-in-out h-full flex flex-col group">
                  {/* Image container like NewHistory */}
                  <div className="relative aspect-[4/3] overflow-hidden rounded-t-lg group bg-gray-100">
                    <img
                      src={`${baseImageUrl}${member.image}`}
                      alt={member.name}
                      loading="lazy"
                      className="w-full h-full object-contain p-2 transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://via.placeholder.com/300x300?text=No+Image';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-70 group-hover:opacity-90 transition duration-300" />
                  </div>

                  <div className="p-5 text-center flex-grow bg-white">
                    <h3 className="text-xl font-semibold text-gray-800"> {t('memberName')}:  {member.name}</h3>
                    <p className="text-sm text-blue-600 mt-1 font-medium">{t('memberPost')}:  {member.position}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Prev Button */}
        <button
          onClick={prev}
          aria-label="Previous slide"
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full w-12 h-12 flex items-center justify-center shadow-md z-20 -ml-6"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7 text-blue-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Next Button */}
        <button
          onClick={next}
          aria-label="Next slide"
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full w-12 h-12 flex items-center justify-center shadow-md z-20 -mr-6"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7 text-blue-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Indicators */}
        <div className="flex justify-center mt-6 space-x-3">
          {membersPhoto.map((_, index) => (
            <button
              key={index}
              onClick={() => goTo(index)}
              className={`w-4 h-4 rounded-full transition-colors ${
                currentSlide === index ? 'bg-blue-600' : 'bg-gray-300'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ImageSlider;
