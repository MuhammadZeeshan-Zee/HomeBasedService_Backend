import React from 'react';
import Hero from "../../common/Hero";
import Footer from '../../common/Footer';
import BlogImage from '../../assests/images/blog.jpg';
import Slider from 'react-slick'; // Import the slick slider

const mediaItems = [
  { type: 'image', src: '/images/Card4.jpg' },
  { type: 'image', src: '/images/Card3.jpg' },
  { type: 'image', src: '/images/Card1.jpg' },
  { type: 'image', src: '/images/Card4.jpg' },
  { type: 'image', src: '/images/Card2.jpg' },
  { type: 'image', src: '/images/Card5.jpg' },
  { type: 'image', src: '/images/Card4.jpg' },
  { type: 'image', src: '/images/Card1.jpg' },
  { type: 'image', src: '/images/Card2.jpg' },
  { type: 'image', src: '/images/Card1.jpg' },
  { type: 'image', src: '/images/Card3.jpg' },
  { type: 'image', src: '/images/Card1.jpg' },
  { type: 'image', src: '/images/Card6.jpg' },
  { type: 'image', src: '/images/Card5.jpg' },
  { type: 'image', src: '/images/Card5.jpg' },
  { type: 'image', src: '/images/Card6.jpg' },
  { type: 'image', src: '/images/Card1.jpg' },
  { type: 'image', src: '/images/Card2.jpg' },
];

const Gallery = () => {
  // Slick carousel settings for the first slider
  const mainSliderSettings = {
    dots: false, // Remove slider dots
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed:1500, // Reduced interval for image change
    slidesToShow: 1, // Show one image at a time
    slidesToScroll: 1, // Scroll one image at a time
  };

  // Slick carousel settings for the second slider
  const secondarySliderSettings = {
    dots: false, // Remove slider dots
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 1500, // Faster interval for image change
    slidesToShow: 3, // Show three images at a time
    slidesToScroll: 1, // Scroll one image at a time
    responsive: [
      {
        breakpoint: 1024, // For tablet or smaller devices
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640, // For mobile devices
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <>
      <Hero text="Gallery" text1="services" image={BlogImage} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-5xl text-gray-800 font-bold text-center my-8">
          Gallery
        </h1>
        <p className="text-center text-gray-600 mb-12">
          Explore our collection of images and videos showcasing our services.
        </p>

        {/* Main Slider */}
        <div className="mb-12">
          <Slider {...mainSliderSettings}>
            {mediaItems.map((item, index) => (
              <div key={index} className="cursor-pointer">
                {item.type === 'image' ? (
                  <img
                    src={item.src}
                    alt={`Media ${index + 1}`}
                    className="w-full h-[500px] object-cover rounded-lg shadow-md transition-transform duration-300 ease-in-out transform hover:scale-105"
                  />
                ) : (
                  <video
                    src={item.src}
                    className="w-full h-[500px] object-cover rounded-lg shadow-md transition-transform duration-300 ease-in-out transform hover:scale-105"
                    controls
                  ></video>
                )}
              </div>
            ))}
          </Slider>
        </div>

        {/* Secondary Slider */}
        <div>
          <h2 className="text-2xl md:text-4xl text-gray-800 font-semibold text-center mb-8">
            More Media
          </h2>
          <Slider {...secondarySliderSettings}>
            {mediaItems.map((item, index) => (
              <div key={index} className="px-2">
                {item.type === 'image' ? (
                  <img
                    src={item.src}
                    alt={`Media ${index + 1}`}
                    className="w-full h-64 object-cover rounded-lg shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105"
                  />
                ) : (
                  <video
                    src={item.src}
                    className="w-full h-64 object-cover rounded-lg shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105"
                    controls
                  ></video>
                )}
              </div>
            ))}
          </Slider>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Gallery;
