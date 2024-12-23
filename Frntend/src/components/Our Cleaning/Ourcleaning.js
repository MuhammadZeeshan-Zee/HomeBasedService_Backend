import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Hero from "../../common/Hero";
import BlogImage from "../../assests/images/headerimg.jpg";
import Footer from "../../common/Footer";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Ourcleaning() {
  const [services, setServices] = useState([]); // State for storing services data

  // Fetch services from API
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get("https://home-based-service-backend.vercel.app/service/readAllService");
        const servicesData = Array.isArray(response.data.data.services)
          ? response.data.data.services
          : [];
        setServices(servicesData);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchServices();
  }, []);

  const teamMembers = [
    {
      img: "./images/Worker1.jpg",
      title: "Zeeshan (Project Coordinator)",
      description:
        "Our Service professionals are meticulously trained, background checked, and have passed multiple interviews and training sessions.",
    },
    {
      img: "./images/Worker3.jpg",
      title: "Abdul Wahab",
      description:
        "Abdul wahab takes great pride in maintaining service and order, which are both essential values in his life. When she is not delighting customers, he enjoys taking strolls through his neighborhood parks.",
    },
    {
      img: "./images/Worker2.jpg",
      title: "Tahir Mehboob",
      description:
        "Tahir takes great pride in maintaining service and order, which are both essential values in his life. When he is not delighting customers, he enjoys taking strolls through his neighborhood parks.",
    },
  ];

  // Slider settings
  const sliderSettings = {
    dots: false, // Enable dots navigation
    infinite: true, // Infinite scrolling
    speed: 500, // Transition speed
    autoplay: true, // Enable autoplay
    autoplaySpeed: 2000, // Time between slide transitions (in milliseconds)
    slidesToShow: 3, // Number of slides to show at once
    slidesToScroll: 1, // Number of slides to scroll at once
    responsive: [
      {
        breakpoint: 1024, // Tablet breakpoint
        settings: {
          slidesToShow: 2, // Show 2 slides on tablets
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768, // Mobile breakpoint
        settings: {
          slidesToShow: 1, // Show 1 slide on mobile
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <Hero text="Home Services in" text1="Gujranwala" image={BlogImage} />

      <div className="bg-[#F8F8F8] min-h-screen flex flex-col items-center">
        <div className="text-center mt-32">
          <h1 className="text-[40px] md:text-[50px] font-bold text-neutral-800">
            Our Maintaining Service
          </h1>
          <p className="text-[16px] md:text-[20px] mt-4 text-neutral-500 leading-custom mb-2 m-3">
            Whether you're moving to a new place, need help with your
            <br className="hidden md:block" /> vacation rental, or are someone
            who just needs a Service place to
            <br className="hidden md:block" /> call home, we've got you covered.
          </p>
        </div>

        {/* Services Section - Using React Slick */}
        <div className="mt-10 w-full px-4">
          <Slider {...sliderSettings}>
            {services.map((service, index) => (
              <div className="w-full md:w-1/3 p-4" key={index}>
                <div className="flex flex-col h-full max-w-sm bg-white rounded-lg border border-gray-200 shadow-md mx-auto">
                  <img
                    src={service.image || "./images/default.jpg"} // Fallback to default image
                    className="w-full rounded-t-lg"
                    alt="Service"
                  />
                  <div className="p-4 flex flex-col flex-grow">
                    <h5 className="text-lg font-medium text-[1.4rem] text-neutral-800">
                      {service.name}
                    </h5>
                    <p className="text-neutral-400 leading-custom mt-4 mb-2 flex-grow">
                      {service.description}
                    </p>
                    <Link to="/book">
                      <button className="bg-transparent text-[#ED5521] font-bold py-2 px-4 rounded mt-6 border border-[#ED5521] hover:bg-[#ED5521] hover:text-white">
                        Book Now
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>

        {/* Meet Our Team Section */}
        <div className="text-center mt-16">
          <p className="text-[#ED5521]">FEATURED</p>
          <h1 className="text-[40px] md:text-[50px] font-bold text-neutral-800">
            Meet our Team
          </h1>
          <div className="mt-10 w-full px-4 mb-16">
            <div className="flex flex-wrap justify-center">
              {teamMembers.map((member, index) => (
                <div key={index} className="w-full md:w-1/3 p-4 flex">
                  <div className="flex flex-col bg-white rounded-lg border border-gray-200 shadow-md mx-auto h-full">
                    <div className="w-full h-72 overflow-hidden">
                      <img
                        src={member.img}
                        className="w-full h-full object-cover rounded-t-lg"
                        alt="Team Member"
                      />
                    </div>
                    <div className="p-4 flex-grow">
                      <h5 className="text-lg font-medium text-[1.4rem] text-neutral-800">
                        {member.title}
                      </h5>
                      <p className="text-neutral-500 leading-custom mt-4 mb-2">
                        {member.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Service Areas Section */}
      <section className="py-6 bg-gray-50">
        <div className="text-center">
          <h1 className="text-[40px] md:text-[50px] font-semibold text-neutral-800">
            Service Areas
          </h1>
          <p className="text-[16px] md:text-[20px] mt-4 text-neutral-500 leading-relaxed max-w-4xl mx-auto">
            From the sprawling vineyards of Napa to the gleaming office buildings of Silicon Valley,
            and all the way to Sacramento.
          </p>
          <Link to="/book">
            <button className="bg-transparent text-[#ED5521] font-bold py-2 px-4 rounded mt-6 border border-[#ED5521] hover:bg-[#ED5521] hover:text-white">
              Book Now
            </button>
          </Link>
        </div>
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 text-center lg:text-left max-w-5xl mx-auto">
          {[
            "Satellite Town",
            "Model Town",
            "Peoples Colony",
            "Master City",
            "Citi Housing",
            "Wapda Town",
            "Garden Town",
            "Dc Colony",
            "Ghakhar",
            "Rahwali Cantt",
            "Eminabad",
            "Qila Didar Singh",
          ].map((location, idx) => (
            <div key={idx} className="bg-white p-4 rounded-lg shadow-lg">
              <p className="font-semibold text-lg text-gray-700">{location}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Ourcleaning;
