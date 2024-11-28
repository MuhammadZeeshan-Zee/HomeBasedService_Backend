import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const UserProfile = () => {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    avtar: "",
  });
  const authData = localStorage.getItem("auth");

  const authObject = JSON.parse(authData);
  console.log("authObject", authObject);

  const token = authObject?.accessToken;
  console.log("token", token);
  useEffect(() => {
    // Retrieve user profile data from API
    const fetchUserProfile = async () => {
      try {
        const res = await axios.get(
          "https://home-based-service.vercel.app/user/getCurrentUser",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log("res", res);
        setUserProfile(res.data.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };
    fetchUserProfile();
  }, []);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("avatar", file);
      
      // Debug: Log FormData entries
      for (let pair of formData.entries()) {
        console.log(pair[0] + ": " + pair[1]);
      }
  
      try {
        const { data } = await axios.post(
          "http://localhost:4000/user/updateAvatar",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("data", data);
  
        // Update the profile image after successful upload
        setUserProfile((prevProfile) => ({
          ...prevProfile,
          avtar: data.data.avtar,
        }));
      } catch (error) {
        console.error("Error updating profile image:", error);
      }
    } else {
      console.error("No file selected.");
    }
  };
  

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className='h-screen pt-12'>
      <div className='max-w-sm mx-auto bg-white rounded-lg overflow-hidden shadow-md p-5 border border-gray-300'>
        <h2 className='text-center text-2xl mb-6 text-gray-800'>Profile</h2>

        {/* Profile Image with File Input */}
        <div className='text-center mb-4 relative'>
          <img
            src={userProfile.avtar || "https://via.placeholder.com/150"}
            alt='Profile'
            className='w-24 h-24 rounded-full mx-auto object-cover cursor-pointer'
            onClick={() => document.getElementById("imageUpload").click()}
          />
          <input
            type='file'
            id='imageUpload'
            accept='image/*'
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
        </div>

        <div className='border-b px-4 pb-6'>
          <div className='text-center my-4'>
            <div className='py-2'>
              <h3 className='font-bold text-2xl text-gray-800 mb-1'>
                {userProfile.firstName} {userProfile.lastName}
              </h3>
              <div className='inline-flex text-gray-700 items-center'>
                {userProfile.phoneNumber}
              </div>
            </div>
          </div>

          <div className='py-2'>
            <div className='text-left text-gray-800'>
              <div className='mb-2'>
                <h1 className='block text-gray-500 font-semibold'>
                  First Name: {userProfile.firstName}
                </h1>
                <h1 className='block text-gray-500 font-semibold'>
                  Last Name: {userProfile.lastName}
                </h1>
                <h1 className='block text-gray-500 font-semibold'>
                  Phone Number: {userProfile.phoneNumber}
                </h1>
              </div>
            </div>
          </div>

          <div className='flex flex-col gap-2 px-2'>
            <Link to='/update-profile' className='w-full'>
              <button className='bg-[#FF0000] w-full text-white py-2 px-4 rounded cursor-pointer'>
                Update Profile
              </button>
            </Link>
            <Link to='/ChangePassword' className='w-full'>
              <button className='bg-[#FF0000] w-full text-white py-2 px-4 rounded cursor-pointer'>
                Change Password
              </button>
            </Link>
            <button
              onClick={handleLogout}
              className='bg-[#FF0000] w-full text-white py-2 px-4 rounded cursor-pointer'
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
