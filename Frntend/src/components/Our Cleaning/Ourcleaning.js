import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Hero from "../../common/Hero";
import BlogImage from "../../assests/images/headerimg.jpg";
import Footer from "../../common/Footer";

function Ourcleaning() {
  const [services, setServices] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // State for search term

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

  // Filter Logic for Services Only
  const filteredServices = services.filter(
    (service) =>
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Highlight Function for Search Term
  const highlightText = (text, search) => {
    if (!search) return text;
    const regex = new RegExp(`(${search})`, "gi");
    return text.replace(regex, `<span style="background-color: yellow;">$1</span>`);
  };

  return (
    <>
      <Hero text="Home Services in" text1="Gujranwala" image={BlogImage} />

      <div className="bg-[#F8F8F8] min-h-screen flex flex-col items-center">
        {/* Search Bar - Only for Services Section */}
        <div className="w-full p-4 flex justify-center bg-white shadow-md sticky top-0 z-50">
          <input
            type="text"
            placeholder="Search Services..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-1/2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ED5521]"
          />
        </div>

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

        {/* Services Section */}
        <div className="mt-10 w-full px-4">
          <div className="flex flex-wrap justify-center">
            {filteredServices.length > 0 ? (
              filteredServices.map((service, index) => (
                <div className="w-full md:w-1/3 p-4" key={index}>
                  <div className="flex flex-col h-full max-w-sm bg-white rounded-lg border border-gray-200 shadow-md mx-auto">
                    <img
                      src={service.image || "./images/default.jpg"}
                      className="w-full rounded-t-lg"
                      alt="Service"
                    />
                    <div className="p-4 flex flex-col flex-grow">
                      <h5
                        className="text-lg font-medium text-[1.4rem] text-neutral-800"
                        dangerouslySetInnerHTML={{
                          __html: highlightText(service.name, searchTerm),
                        }}
                      ></h5>
                      <p
                        className="text-neutral-400 leading-custom mt-4 mb-2 flex-grow"
                        dangerouslySetInnerHTML={{
                          __html: highlightText(service.description, searchTerm),
                        }}
                      ></p>
                      <Link to="/book">
                        <button className="bg-transparent text-[#ED5521] font-bold py-2 px-4 rounded mt-6 border border-[#ED5521] hover:bg-[#ED5521] hover:text-white">
                          Book Now
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No services found for the search term.</p>
            )}
          </div>
        </div>

        {/* Team Section (Unfiltered) */}
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

      <Footer />
    </>
  );
}

export default Ourcleaning;
