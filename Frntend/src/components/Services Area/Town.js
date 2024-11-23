/* eslint-disable jsx-a11y/alt-text */
import { Link } from "react-router-dom";
import Footer from '../../common/Footer';
import BlogImage from '../../assests/images/model.jpg';
import Hero from "../../common/Hero";


function Town() {

  return (
    <>
      <Hero text="Modal Town" text1="services" image={BlogImage} />

      {/* Cleaning professions section */}
      <section className="py-16 bg-gray-50">
        <div className="text-center">
          <p className="text-[#ED5521] text-4xl font-semibold">Model Town</p>
          <h1 className="text-[30px] md:text-[50px] font-semibold text-neutral-800 mt-4">
            Meet our team
          </h1>
          <p className="text-[16px] md:text-[20px] mt-4 text-neutral-500 leading-relaxed max-w-3xl mx-auto">
            The most skilled, dedicated, and highly-rated professionals in your area. Guaranteed.
          </p>
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-8">
          {["./images/Card6.jpg", "./images/Card4.jpg", "./images/Card1.jpg"].map((img, idx) => (
            <div
              key={idx}
              className="w-32 h-32 md:w-64 md:h-64 p-0.5 bg-blue-400 shadow-lg rounded-full flex items-center justify-center"
            >
              <img
                src={img}
                alt={`Team Member ${idx + 1}`}
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Our House Packages */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center lg:text-left">
            <h1 className="text-2xl lg:text-4xl font-bold text-[#FF0000]">Our House Packages.</h1>
          </div>
          <div className="text-center lg:text-left mt-6">
            <h2 className="text-xl lg:text-2xl font-semibold">Basic House Services</h2>
          </div>
          <div className="text-center lg:text-left mt-4">
            <p className="text-[16px] md:text-[20px] text-neutral-500 leading-relaxed">
              For basic house services or office services, choose the Basic services to shine up
              your:
            </p>
          </div>
          <div className="mt-6">
            <ul className="list-disc list-inside text-base lg:text-[20px] text-neutral-700 space-y-2 lg:space-y-4">
              <li>Plumbering</li>
              <li>Paint</li>
              <li>Electrician</li>
              <li>AC/Fridge</li>
              <li>Carpet Clean</li>
            </ul>
          </div>
        </div>
      </section>



      {/* Service Area Section */}
      <section className="py-16 bg-gray-50">
        <div className="text-center">
          <h1 className="text-[40px] md:text-[50px] font-semibold text-neutral-800">
            Model Town Service Areas
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
            "Block A",
            "Block B",
            "Block C",
            "Block D",
            "Block E",
            "Block F",
            "Block G",
            "Block K",
          ].map((location, idx) => (
            <div key={idx} className="bg-white p-4 rounded-lg shadow-lg">
              <p className="font-semibold text-lg text-gray-700">{location}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </>
  )
}

export default Town