import React, { useState } from "react";
import axios from "axios";
import { message, Rate } from "antd";

const Feedback = () => {
  const userExist = localStorage.getItem("auth");
  const userData = userExist ? JSON.parse(userExist) : null;

  const [feedbackData, setFeedbackData] = useState({
    
    totalCharges: "", // New field for Total Charges
    rating: 0,
    feedback: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFeedbackData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRatingChange = (value) => {
    setFeedbackData((prevData) => ({
      ...prevData,
      rating: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
     
      !feedbackData.totalCharges || // Validate Total Charges field
      !feedbackData.feedback ||
      feedbackData.rating === 0
    ) {
      message.error("All fields are required.");
      return;
    }

    setLoading(true);

    try {
      const authData = localStorage.getItem("auth");
      const authObject = JSON.parse(authData);
      const token = authObject?.accessToken;

      const response = await axios.post(
        "https://your-backend-endpoint/feedback",
        feedbackData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setLoading(false);

      if (response.data.success) {
        message.success("Feedback submitted successfully!");
        setFeedbackData({
        
          totalCharges: "", // Reset Total Charges field
          rating: 0,
          feedback: "",
        });
      } else {
        message.error("Failed to submit feedback. Please try again.");
      }
    } catch (error) {
      setLoading(false);
      console.error("Error submitting feedback:", error);
      message.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="p-5 h-screen">
      <div className="max-w-lg mx-auto my-5 p-4 border border-gray-300 rounded-md shadow-md">
        <h2 className="text-center text-xl mb-4 text-gray-800">Customer Feedback</h2>
        <form onSubmit={handleSubmit}>
      

          {/* Total Charges */}
          <div className="mb-3">
            <label className="block text-gray-700 text-sm mb-1">Total Charges</label>
            <input
              type="number"
              name="totalCharges"
              value={feedbackData.totalCharges}
              onChange={handleChange}
              className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Enter total charges paid"
            />
          </div>

          {/* Rating */}
          <div className="mb-3">
            <label className="block text-gray-700 text-sm mb-1">Star Rating</label>
            <Rate
              value={feedbackData.rating}
              onChange={handleRatingChange}
              allowClear
            />
          </div>

          {/* Feedback */}
          <div className="mb-3">
            <label className="block text-gray-700 text-sm mb-1">Feedback</label>
            <textarea
              name="feedback"
              value={feedbackData.feedback}
              onChange={handleChange}
              className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Regarding to service provider and Total charges "
              rows="3"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 bg-red-500 text-white rounded-md"
          >
            {loading ? "Submitting..." : "Submit Feedback"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Feedback;
