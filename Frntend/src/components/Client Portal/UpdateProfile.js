import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function UpdateProfile() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const authData = localStorage.getItem("auth");
  
  const navigate = useNavigate();
  const authObject = JSON.parse(authData);
  console.log("authObject",authObject);
  
  const token = authObject?.accessToken;
  console.log("token",token);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:4000/user/getCurrentUser', {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("res", res);
        setFirstName(res.data.data.firstName);
        setLastName(res.data.data.lastName);
        setPhoneNumber(res.data.data.phoneNumber);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/user/updateUserDetails', {
        firstName,
        lastName,
        phoneNumber,
      },{
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status === 200) {
        setMessage("Profile updated successfully!");
        const updatedAuthData = {
          ...authObject,
          user: { ...authObject.user, firstName, lastName, phoneNumber },
        };
        localStorage.setItem("auth", JSON.stringify(updatedAuthData));

        navigate("/profile");
      }
    } catch (error) {
      setMessage("Failed to update profile. Please try again.");
    }
  };

  return (
    <div className="h-screen p-5">
      <div className="max-w-md mx-auto my-10 p-5 border border-gray-300 rounded-md shadow-md bg-white">
        <h2 className="text-center text-2xl mb-6 text-gray-800">Update Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">First Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-red-500"
              placeholder="Enter your first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Last Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-red-500"
              placeholder="Enter your last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Phone Number</label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-red-500"
              placeholder="Enter your phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Save Changes
          </button>
          {message && <p className="mt-4 text-center text-gray-700">{message}</p>}
        </form>
      </div>
    </div>
  );
}

export default UpdateProfile;
