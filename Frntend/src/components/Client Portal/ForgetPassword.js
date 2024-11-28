import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // 'navigate' is now 'useNavigate'
import axios from 'axios';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      await axios.post('https://home-based-service-backend.vercel.app/user/forgotPassword', { email });
      setMessage('Verification email sent successfully.');

      // Store the email in localStorage
      localStorage.setItem('forgotPasswordEmail', email);

      navigate('/verify');
    } catch (error) {
      setError('Failed to send verification email. Please try again.');
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="max-w-md mx-auto my-10 p-5 border border-gray-300 rounded-md shadow-md">
      <h2 className="text-center text-2xl mb-6 text-gray-800">Forget Password</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-red-500"
            placeholder="Enter your registered email"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          disabled={loading}
        >
          {loading ? 'Sending...' : 'Send Password reset email'}
        </button>
      </form>
      {message && <p className="text-center text-green-500 mt-4">{message}</p>}
      {error && <p className="text-center text-red-500 mt-4">{error}</p>}
      <div className="text-center mt-4">
        <p className="text-gray-700">
          <Link to="/login">
            <button className="text-red-500 hover:underline">
              Go back to Sign In
            </button>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgetPassword;
