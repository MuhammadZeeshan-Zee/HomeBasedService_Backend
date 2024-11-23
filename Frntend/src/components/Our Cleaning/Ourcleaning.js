import { Link } from "react-router-dom";
import Hero from "../../common/Hero";
import BlogImage from "../../assests/images/headerimg.jpg";
import Footer from "../../common/Footer";

function Ourcleaning() {
  const arr = [
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

  return (
    <>
      <Hero text="Home Services in" text1="Gujranwala" image={BlogImage} />

      <div className="bg-[#F8F8F8] min-h-screen flex flex-col items-center ">
        <div className="text-center mt-32">
          <h1 className="text-[40px] md:text-[50px] font-bold text-neutral-800">
            Our maintaining Service
          </h1>
          <p className="text-[16px] md:text-[20px] mt-4 text-neutral-500 leading-custom mb-2 m-3">
            Whether you're moving to a new place, need help with your
            <br className="hidden md:block" /> vacation rental, or are someone
            who just needs a Service place to
            <br className="hidden md:block" /> call home, we've got you covered.
          </p>
        </div>

        <div className="mt-10 w-full px-4">
          <div className="flex flex-wrap justify-center">
            {[
              {
                img: "./images/Card1.jpg",
                title: "House Cleaning Service",
                description:
                  "Weekly, Bi-weekly, monthly professional house  service for your house or apartment.",
              },
              {
                img: "./images/Card2.jpg",
                title: "Electrician Service",
                description:
                  "Our deep service is a great place to start before opting for a  service.",
              },
              {
                img: "./images/Card3.jpg",
                title: "Paint Services",
                description:
                  "Whether you're moving into a new place or moving out of one, we'll be there to Service your space.",
              },
              {
                img: "./images/Card4.jpg",
                title: "Plumber Services",
                description:
                  "Let's make sure vacation rental guests are always greeted with a fresh clean home.",
              },
              {
                img: "./images/Card5.jpg",
                title: "AC/Fridge Services",
                description:
                  "Let's make your office maintenance and inviting for your hard-working employees.",
              },
              {
                img: "./images/Card6.jpg",
                title: "Carpet Cleaning Services",
                description:
                  "Top-notch professional commercial  services in & around the Bay Area.",
              },
            ].map((card, index) => (
              <div className="w-full md:w-1/3 p-4" key={index}>
                <div className="flex flex-col h-full max-w-sm bg-white rounded-lg border border-gray-200 shadow-md mx-auto">
                  <img
                    src={card.img}
                    className="w-full rounded-t-lg"
                    alt="Card"
                  />
                  <div className="p-4 flex flex-col flex-grow">
                    <h5 className="text-lg font-medium text-[1.4rem] text-neutral-800">
                      {card.title}
                    </h5>
                    <p className="text-neutral-400 leading-custom mt-4 mb-2 flex-grow">
                      {card.description}
                    </p>
                    <Link to="/book">
                      <button className="bg-transparent text-[#ED5521] font-bold py-2 px-4 rounded mt-2 border">
                        Book Now
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-16">
          <p className="text-[#ED5521]">FEATURED</p>
          <h1 className="text-[40px] md:text-[50px] font-bold text-neutral-800">
            Meet our Team
          </h1>
          <p className="text-[16px] md:text-[20px] mt-4 text-neutral-500 leading-custom mb-2"></p>
          <Link to="/book">
            <button className="bg-transparent text-[#ED5521] font-bold py-2 px-4 rounded mt-6 border border-[#ED5521] hover:bg-[#ED5521] hover:text-white">
              Book Now
            </button>
          </Link>

          <div className="mt-10 w-full px-4 mb-16">
            <div className="flex flex-wrap justify-center">
              {arr.map((item, index) => (
                <div key={index} className="w-full md:w-1/3 p-4 flex">
                  <div className="flex flex-col bg-white rounded-lg border border-gray-200 shadow-md mx-auto h-full">
                    <div className="w-full h-72 overflow-hidden">
                      <img
                        src={item.img}
                        className="w-full h-full object-cover rounded-t-lg"
                        alt="Card"
                      />
                    </div>
                    <div className="p-4 flex-grow">
                      <h5 className="text-lg font-medium text-[1.4rem] text-neutral-800">
                        {item.title}
                      </h5>
                      <p className="text-neutral-500 leading-custom mt-4 mb-2">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Service Area Section */}
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
