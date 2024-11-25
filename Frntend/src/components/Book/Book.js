import Hero from "../../common/Hero";
import axios from "axios";
import { message, Spin, Modal } from "antd"; // Import Modal for video and service charge popup
import BlogImage from "../../assests/images/blog.jpg";
import Footer from "../../common/Footer";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationArrow } from '@fortawesome/free-solid-svg-icons';

function Book() {
  const navigate = useNavigate();
  const userExist = localStorage.getItem("auth");
  const [user, setUser] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for video modal
  const [isServiceChargeModalOpen, setIsServiceChargeModalOpen] = useState(true); // State for service charge modal
  const [mapAddressError, setMapAddressError] = useState(""); // State for mapAddress validation error
  const userData = userExist ? JSON.parse(userExist) : null;

  const [formData, setFormData] = useState({
    firstName: userData?.user?.firstName || "",
    lastName: userData?.user?.lastName || "",
    email: userData?.user?.email || "",
    phoneNumber: userData?.user?.phoneNumber || "",
    serviceName: "",
    serviceArea: "",
    address: "",
    mapAddress: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    // Clear error message when user starts typing in the mapAddress field
    if (e.target.name === "mapAddress") {
      setMapAddressError("");
    }
  };

  const handleGetCurrentLocation = () => {
    if (!navigator.geolocation) {
      message.error("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const mapLink = `https://www.google.com/maps?q=${latitude},${longitude}`;
        setFormData((prev) => ({
          ...prev,
          mapAddress: mapLink,
        }));
        message.success("Location fetched successfully!");
      },
      (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            message.error("Location access denied by the user.");
            break;
          case error.POSITION_UNAVAILABLE:
            message.error("Location information is unavailable.");
            break;
          case error.TIMEOUT:
            message.error("The request to get location timed out.");
            break;
          default:
            message.error("An unknown error occurred.");
            break;
        }
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const authData = localStorage.getItem("auth");
      const authObject = JSON.parse(authData);
      const token = authObject?.accessToken;

      await axios.post(
        "http://localhost:4000/user/order",
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      message.success("The Order Is Booked");
      setFormData({
        firstName: userData?.user?.firstName || "",
        lastName: userData?.user?.lastName || "",
        email: userData?.user?.email || "",
        phoneNumber: userData?.user?.phoneNumber || "",
        serviceName: "",
        serviceArea: "",
        address: "",
        mapAddress: "",
      });
    } catch (error) {
      console.error("Error booking:", error);
      message.error("The Order Not Booked. Try Again");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!userExist) {
      navigate("/login");
    } else {
      setUser(true);
    }
  }, [userExist, navigate]);

  if (!user) return null;

  return (
    <>
      <Hero text="Book" text1="Services Now" image={BlogImage} />

      {/* Service Charges Modal */}
      <Modal
        title="Service Charges"
        open={isServiceChargeModalOpen}
        onOk={() => setIsServiceChargeModalOpen(false)}
        onCancel={() => setIsServiceChargeModalOpen(false)}
        footer={[
          <button
            key="ok"
            className="bg-[#FF0000] text-white py-1 px-4 rounded"
            onClick={() => setIsServiceChargeModalOpen(false)}
          >
            OK
          </button>,
        ]}
      >
        <p className="text-lg">
          A compulsory service charge of <strong>200-RS</strong> will be added to your booking.
        </p>
      </Modal>



      <div className="flex-1 flex items-center justify-center p-4 sm:p-8">
        <div id="Request-a-quote" className="w-full max-w-lg mx-auto">
          <form
            onSubmit={handleSubmit}
            className="space-y-4 p-5 border-4 border-red-400 rounded-lg shadow-lg"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label htmlFor="firstName" className="mb-2">
                  First Name *
                </label>
                <input
                  readOnly
                  className="form-input w-full p-2 border border-gray-300 rounded"
                  maxLength="256"
                  name="firstName"
                  placeholder="F-Name"
                  type="text"
                  id="firstName"
                  required
                  value={formData.firstName}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="lastName" className="mb-2">
                  Last Name *
                </label>
                <input
                  readOnly
                  className="form-input w-full p-2 border border-gray-300 rounded"
                  maxLength="256"
                  name="lastName"
                  placeholder="L-Name"
                  type="text"
                  id="lastName"
                  required
                  value={formData.lastName}
                />
              </div>
            </div>

            {/* Email and Phone Number Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label htmlFor="email" className="mb-2">Email *</label>
                <input
                  readOnly
                  className="form-input w-full p-2 border border-gray-300 rounded"
                  name="email"
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="phoneNumber" className="mb-2">Phone *</label>
                <input
                  readOnly
                  className="form-input w-full p-2 border border-gray-300 rounded"
                  name="phoneNumber"
                  type="tel"
                  id="phoneNumber"
                  required
                  value={formData.phoneNumber}
                />
              </div>
            </div>

            {/* Service Selection */}
            <div className="flex flex-col mb-4">
              <label htmlFor="serviceName">Services *</label>
              <select
                id="serviceName"
                name="serviceName"
                required
                className="form-select w-full p-2 border border-gray-300 rounded"
                onChange={handleChange}
                value={formData.serviceName}
              >
                <option value="" disabled>Select services</option>
                <option value="Paint Services">Paint Services</option>
                <option value="House Cleaning Service">House Cleaning Service</option>
                <option value="Electrician Service">Electrician Service</option>
                <option value="Plumber Services">Plumber Services</option>
                <option value="AC/Fridge Services">AC/Fridge Services</option>
                <option value="Carpet Cleaning Services">Carpet Cleaning Services</option>
              </select>
            </div>

            {/* Additional Fields */}
            <div className="grid grid-cols-1 gap-4">
              <div className="flex flex-col">
                <label htmlFor="serviceArea" className="mb-2">
                  Select Area *
                </label>
                <select
                  id="serviceArea"
                  name="serviceArea"
                  required
                  className="form-select w-full p-2 border border-gray-300 rounded"
                  onChange={handleChange}
                  value={formData.serviceArea}
                >
                  <option className="text-gray-500">Select Area</option>
                  <option value="Satellite Town">Satellite Town</option>
                  <option value="Model Town">Model Town</option>
                  <option value="Peoples Colony">Peoples Colony</option>
                  <option value="Master City">Master City</option>
                  <option value="Citi Housing">Citi Housing</option>
                  <option value="Wapda Town">Wapda Town</option>
                  <option value="Garden Town">Garden Town</option>
                  <option value="Dc colony">Dc colony</option>
                  <option value="Ghakhar">Ghakhar</option>
                  <option value="Gujranwala Cantt">Rahwali Cantt</option>
                  <option value="Eminabad">Eminabad</option>
                  <option value="Qila Didar Singh">Qila Didar Singh</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div className="flex flex-col">
                <label htmlFor="address" className="mb-2">
                  Address *
                </label>
                <input
                  className="form-input w-full p-2 border border-gray-300 rounded"
                  maxLength="256"
                  name="address"
                  placeholder="Address"
                  type="text"
                  id="address"
                  required
                  onChange={handleChange}
                  value={formData.address}
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label htmlFor="mapAddress" className="mb-2">Map Address *</label>
              <div className="flex">
                <input
                  className={`form-input w-full p-2 border ${mapAddressError ? "border-red-500" : "border-gray-300"} rounded`}
                  name="mapAddress"
                  placeholder="Drop map location link"
                  type="text"
                  onChange={handleChange}
                  value={formData.mapAddress}
                />
                <button
                  type="button"
                  onClick={handleGetCurrentLocation}
                  className="bg-[#FF0000] text-white px-3 py-1 rounded ml-2 flex items-center"
                >
                  <FontAwesomeIcon icon={faLocationArrow} className="mr-2" />

                </button>
              </div>
              {mapAddressError && (
                <span className="text-red-500 text-sm mt-1">{mapAddressError}</span>
              )}
            </div>

            {/* Submit Button with Loader */}
            <div className="p-2">
              <button
                type="submit"
                className="bg-[#FF0000] w-full text-white py-2 px-4 rounded cursor-pointer"
                disabled={loading}
              >
                {loading ? <Spin /> : "Send"}
              </button>
            </div>

          </form>
        </div>
      </div>


      {/* Video Modal */}
      <Modal
        title="How to Fill Data Correctly"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <iframe
          width="100%"
          height="315"
          src="./images/video.mp4"
          title="YouTube video"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </Modal>

      {/* Open Modal Button */}
      <div className="flex justify-center mb-8">
        <button
          className="text-blue-500 hover:underline"
          onClick={() => setIsModalOpen(true)}
        >
          Watch how to fill data correctly
        </button>
      </div>
      <Footer />



      {/* Video Modal */}
    </>
  );
}

export default Book;
