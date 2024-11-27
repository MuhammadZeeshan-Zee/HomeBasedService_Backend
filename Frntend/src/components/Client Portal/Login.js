/* eslint-disable no-unused-vars */
import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { message, Spin } from "antd";
import UserContext from "../Context/UserContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../../features/auth/authSlice";
import Cookies from "js-cookie";

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (event) => {
    const { name, value } = event.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!loginData.email || !loginData.password) {
      message.error("All fields are required");
      return;
    }

    if (/\s/.test(loginData.email)) {
      message.error("Email should not contain spaces");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post("https://home-based-service.vercel.app/user/login", {
        email: loginData.email,
        password: loginData.password,
      });
      setLoading(false);
      console.log("response.data.data.user.role", response.data.data.user.role);
      if (response.data.data.user.action === true) {
        console.log("true");
        navigate("/");
        message.error("you are blocked by admin")
      } else {
        if (response.data.statusCode === 200) {
          const { accessToken, refreshToken, user } = response.data.data;
          console.log("accessToken", accessToken);
          // Cookies.set('accessToken', accessToken, { path: '/' });
          localStorage.setItem(
            "auth",
            JSON.stringify({ accessToken, refreshToken, user })
          );

          setUser(user);
          dispatch(setUserInfo(response.data));
          if (response.data.data.user.role === "admin") {
            navigate("/admin");
          }
          if (response.data.data.user.role === "user") {
            navigate("/");
          }
          // navigate(response.data.data.user.role === 'admin' ? '/admin' : '/');
          // navigate(response.data.data.user.role === "user" ? "/book" : "/")
        } else {
          message.error(response.data.message);
        }
      }
    } catch (error) {
      setLoading(false);
      console.error("Error during login:", error);
      message.error("An error occurred during login, please try again");
    }
  };

  return (
    <div className='p-5 h-screen'>
      <div className='max-w-md mx-auto my-10 p-5 border border-gray-300 rounded-md shadow-md'>
        <h2 className='text-center text-2xl mb-6 text-gray-800'>Sign In</h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label className='block text-gray-700'>Email</label>
            <input
              type='email'
              name='email'
              value={loginData.email}
              onChange={handleChange}
              className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-red-500'
              placeholder='Enter your email'
            />
          </div>
          <div className='mb-4 relative'>
            <label className='block text-gray-700'>Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name='password'
              value={loginData.password}
              onChange={handleChange}
              className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-red-500'
              placeholder='Enter your password'
            />
            <button
              type='button'
              onClick={togglePasswordVisibility}
              className='absolute inset-y-0 right-0 pr-3 pt-5 flex items-center text-sm leading-5'
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <button
            type='submit'
            className='w-full py-2 bg-red-500 text-white rounded-md hover:bg-red-600'
          >
            {loading ? <Spin /> : "Sign In"}
          </button>
        </form>
        <div className='flex justify-center mt-4 space-x-4'>
          <Link to='/register'>
            <button className='text-red-500 hover:underline'>Sign Up</button>
          </Link>
          <Link to='/forgetpassword'>
            <button className='text-red-500 hover:underline'>
              Forget Password
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
