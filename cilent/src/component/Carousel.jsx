import React, { useState, useEffect } from 'react';

const Carousel = () => {
  const images = [
    'https://static.vecteezy.com/system/resources/previews/004/299/835/original/online-shopping-on-phone-buy-sell-business-digital-web-banner-application-money-advertising-payment-ecommerce-illustration-search-free-vector.jpg',
    'https://www.srikumaran.com.au/assets/images/slider/slider-2.jpg',
    'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/18d60b107187879.5fa16aecd880f.jpg',
    'https://media.pocketgamer.com/artwork/ra-100489-1734354251/little-bird-earbuds-with-banner.jpg',
  ];

  const [current, setCurrent] = useState(0);


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000); 

    return () => clearInterval(interval); 
  }, [images.length]);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };

 return (
    <div className="relative w-full mx-auto overflow-hidden rounded-lg shadow-lg h-64">

      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src={images[current]}
          alt="blur-bg"
          className="absolute top-0 left-0 w-full h-full object-cover blur scale-[1.3]"
        />
        <div className="absolute inset-0 bg-white/30 backdrop-blur-sm" />
      </div>


      <div
        className="relative z-10 flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {images.map((img, index) => (
          <div key={index} className="w-full flex-shrink-0 h-64 flex items-center justify-center">
            <img
              src={img}
              alt={`Slide ${index + 1}`}
              className="h-full min-h-68 object-contain bg-red rounded-md shadow-lg"
            />
          </div>
        ))}
      </div>

      <button
        onClick={prevSlide}
        className="absolute z-20 left-4 top-1/2 transform -translate-y-1/2 bg-white/80 text-black px-2 py-1 rounded-full shadow"
      >
        ‹
      </button>
      <button
        onClick={nextSlide}
        className="absolute z-20 right-4 top-1/2 transform -translate-y-1/2 bg-white/80 text-black px-2 py-1 rounded-full shadow"
      >
        ›
      </button>

      <div className="absolute z-20 bottom-3 left-1/2 transform -translate-x-1/2 flex gap-2">
        {images.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full ${
              current === index ? 'bg-blue-600' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
