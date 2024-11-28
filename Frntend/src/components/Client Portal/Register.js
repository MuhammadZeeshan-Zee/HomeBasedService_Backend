import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { message } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const Register = () => {
  const [registerData, setRegistrationData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    otp: '', // New field for OTP
  });
  const [showPassword, setShowPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [loadingOtp, setLoadingOtp] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRegistrationData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleGetOtp = async () => {
    if (!registerData.email) {
      message.error("Please enter your email to get the OTP.");
      return;
    }
  
    setLoadingOtp(true);
    try {
      const response = await axios.post('http://localhost:4000/user/otp', { email: registerData.email });
      if (response.status === 200) {
        setOtpSent(true);
        message.success("OTP sent to your email.");
      } else {
        message.error(response.data.message || "Failed to send OTP.");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      message.error("An error occurred while sending the OTP. Please try again.");
    } finally {
      setLoadingOtp(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[\W_]).{8,}$/;

    if (!registerData.firstName || !registerData.lastName || !registerData.email || !registerData.password || !registerData.otp) {
      message.error("All fields are required.");
      return;
    }

    if (!emailRegex.test(registerData.email)) {
      message.error("Please enter a valid email address.");
      return;
    }

    if (!passwordRegex.test(registerData.password)) {
      message.error("Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.");
      return;
    }

    try {
      const response = await axios.post('https://home-based-service.vercel.app/user/register', registerData);
      if (response.status === 201) {
        message.success("You registered successfully.");
        navigate('/login');
      } else {
        message.error(response.data.message || "Registration failed.");
      }
    } catch (error) {
      console.error("Registration error:", error);
      message.error("An error occurred while registering. Please try again later.");
    }
  };

  return (
    <div className='p-5 h-screen'>
      <div className="max-w-md mx-auto my-10 p-5 border border-gray-300 rounded-md shadow-md">
        <h2 className="text-center text-2xl mb-6 text-gray-800">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <div className="flex items-center space-x-2">
              <input
                type="email"
                value={registerData.email}
                name="email"
                onChange={handleChange}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-red-500"
              />
              <button
                type="button"
                onClick={handleGetOtp}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                disabled={loadingOtp}
              >
                 {loading ? <Spin /> : "Send"}
              </button>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">OTP</label>
            <input
              type="text"
              value={registerData.otp}
              name='otp'
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-red-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">First Name</label>
            <input
              type="text"
              value={registerData.firstName}
              onChange={handleChange}
              name='firstName'
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-red-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Last Name</label>
            <input
              type="text"
              value={registerData.lastName}
              onChange={handleChange}
              name='lastName'
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-red-500"
            />
          </div>

         

          <div className="mb-4">
            <label className="block text-gray-700">Phone Number*</label>
            <input
              type="tel"
              value={registerData.phoneNumber}
              onChange={handleChange}
              name='phoneNumber'
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-red-500"
            />
          </div>
          <div className="mb-4 relative">
            <label className="block text-gray-700">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              value={registerData.password}
              name='password'
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-red-500"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 pr-3 pt-5 flex items-center text-sm leading-5"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <button type="submit" className="w-full py-2 bg-red-500 text-white rounded-md hover:bg-red-600">Sign Up</button>
        </form>
        <div className="text-center mt-4">
          <p className="text-gray-700">
            <Link to="/login">
              <button className="text-red-500 hover:underline">
                Already have an account? <br /> Sign In
              </button>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;