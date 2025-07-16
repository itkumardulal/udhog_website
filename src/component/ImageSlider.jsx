import React, { useState, useEffect } from 'react';
import { useTranslation } from '../context/TranslationContext';
import { useNavigate } from 'react-router-dom';
import Male from '../assets/Male.jpg';
import Female from '../assets/female.jpg';

function ImageSlider() {
    const { t } = useTranslation();
    const [currentSlide, setCurrentSlide] = useState(0);
    const [visibleSlides, setVisibleSlides] = useState(1);
    const [slidePercentage, setSlidePercentage] = useState(100);
    const navigate = useNavigate();

    const slides = [
        {
            id: 1,
            image: Male,
            title: 'Member 1',
            description: 'Member description',
        },
        {
            id: 2,
            image: Female,
            title: 'Member 2',
            description: 'Member description',
        },
        {
            id: 3,
            image: Male,
            title: 'Member 3',
            description: 'Nature third',
        },
        {
            id: 4,
            image: Female,
            title: 'Member 4',
            description: 'Nature third',
        },
    ];

    useEffect(() => {
        updateVisibleSlides();
        window.addEventListener('resize', updateVisibleSlides);
        return () => window.removeEventListener('resize', updateVisibleSlides);
    }, []);

    const updateVisibleSlides = () => {
        if (window.innerWidth < 768) {
            setVisibleSlides(1);
            setSlidePercentage(100);
        } else {
            setVisibleSlides(3);
            setSlidePercentage(100 / 3);
        }
    };

    const next = () => {
        if (currentSlide < slides.length - visibleSlides) {
            setCurrentSlide(currentSlide + 1);
        }
    };

    const prev = () => {
        if (currentSlide > 0) {
            setCurrentSlide(currentSlide - 1);
        }
    };

    const goTo = (index) => {
        if (index <= slides.length - visibleSlides) {
            setCurrentSlide(index);
        } else {
            setCurrentSlide(slides.length - visibleSlides);
        }
    };

    // const handleViewMessage = (slide) => {
    //     navigate('/message', { state: { slide } });
    // };

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-lg">
        
                <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">{t('members1')}</h2>
            </div>
            <div className="relative">
                <div className="relative overflow-hidden rounded-lg shadow-xl bg-white">
                    <div
                        className="flex transition-transform duration-500 ease-in-out"
                        style={{ transform: `translateX(-${currentSlide * slidePercentage}%)` }}
                    >
                        {slides.map((slide, index) => (
                            <div
                                key={slide.id}
                                className="w-full md:w-1/3 flex-shrink-0 px-2 py-4"
                            >
                                <div className="rounded-lg overflow-hidden shadow-md h-full flex flex-col">
                                    <div className="bg-gray-200 h-48 md:h-64 flex items-center justify-center">
                                        <img
                                            src={slide.image}
                                            alt={slide.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="p-4 flex-grow">
                                        <h3 className="text-xl font-semibold">{slide.title}</h3>
                                        <p className="text-gray-600 mt-2">{slide.description}</p>
                                    </div>
                                    <div className="p-4">
                                        {/* <button
                                            onClick={() => handleViewMessage(slide)}
                                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
                                        >
                                            {t('viewMessage')}
                                        </button> */}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Previous Button */}
                <button
                    onClick={prev}
                    disabled={currentSlide === 0}
                    className={`absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md z-10 -ml-4 ${currentSlide === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                    </svg>
                </button>

                {/* Next Button */}
                <button
                    onClick={next}
                    disabled={currentSlide >= slides.length - visibleSlides}
                    className={`absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md z-10 -mr-4 ${currentSlide >= slides.length - visibleSlides ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                </button>

                {/* Indicators */}
                <div className="flex justify-center mt-4 space-x-2">
                    {slides.map((slide, index) => (
                        <button
                            key={slide.id}
                            onClick={() => goTo(index)}
                            className={`w-3 h-3 rounded-full transition-colors ${currentSlide === index ? 'bg-blue-600' : 'bg-gray-300'}`}
                            aria-label={`Go to slide ${index + 1}`}
                        ></button>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ImageSlider;
