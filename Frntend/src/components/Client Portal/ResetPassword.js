import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios';

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    // Get email from local storage
    const email = localStorage.getItem('forgotPasswordEmail');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email) {
            setError('No email found. Please try the reset password process again.');
            return;
        }

        try {
            await axios.post('https://home-based-service-backend.vercel.app/user/resetPassword', { email, newPassword: password });
            setSuccess('Password reset successfully!');
            setError('');
            localStorage.removeItem('forgotPasswordEmail'); // Clear email from local storage
            navigate('/login');
        } catch (err) {
            setError('Failed to reset password. Please try again.');
            setSuccess('');
        }
    };

    return (
        <div className="max-w-md mx-auto my-10 p-5 border border-gray-300 rounded-md shadow-md">
            <h2 className="text-center text-2xl mb-6 text-gray-800">Reset Password</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4 relative">
                    <label className="block text-gray-700">New Password</label>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-red-500"
                        placeholder="Enter your new password"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 pt-5 flex items-center text-sm leading-5"
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                </div>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                {success && <p className="text-green-500 text-center mb-4">{success}</p>}
                <button
                    type="submit"
                    className="w-full py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                    Save Password
                </button>
            </form>
            <div className="text-center mt-4">
                <p className="text-gray-700">
                    <button onClick={() => navigate('/login')} className="text-red-500 hover:underline">
                        Go back to login
                    </button>
                </p>
            </div>
        </div>
    );
};

export default ResetPassword;
