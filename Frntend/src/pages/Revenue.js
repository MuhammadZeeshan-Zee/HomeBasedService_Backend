import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
} from "chart.js";

// Register chart components
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const Revenue = () => {
    const [revenue, setRevenue] = useState(0); // Total revenue state
    const [revenueBreakdown, setRevenueBreakdown] = useState([]); // Breakdown state
    const [calculatorInput, setCalculatorInput] = useState(""); // Calculator input state
    const [adjustments, setAdjustments] = useState([]); // Track adjustments
    const [error, setError] = useState(""); // Error message

    const authData = localStorage.getItem("auth");
    const authObject = JSON.parse(authData);
    const token = authObject?.accessToken;

    useEffect(() => {
        fetchRevenueData();
    }, []);

    const fetchRevenueData = async () => {
        try {
            const response = await axios.get(
                "https://home-based-service-backend.vercel.app/finance/getRevenue", // Replace with your API endpoint
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            setRevenue(response.data.data.totalRevenue);
            setRevenueBreakdown(response.data.data.breakdown || []); // Assuming the API returns a breakdown
        } catch (error) {
            console.error("Error fetching revenue data:", error);
        }
    };

    const handleCalculatorChange = (e) => {
        setCalculatorInput(e.target.value);
        setError(""); // Clear error when user types
    };

    const updateRevenue = (type) => {
        const adjustment = parseFloat(calculatorInput);
        if (isNaN(adjustment) || adjustment <= 0) {
            setError("Please enter a valid positive amount.");
            return;
        }

        // Update revenue based on type (add or subtract)
        setRevenue((prevRevenue) => prevRevenue + (type === "add" ? adjustment : -adjustment));
        setAdjustments((prev) => [
            ...prev,
            { type, amount: adjustment, timestamp: new Date().toLocaleString() },
        ]);
        setCalculatorInput(""); // Clear input field
    };

    const chartData = {
        labels: revenueBreakdown.map((item) => item.category), // Example: ['Service A', 'Service B']
        datasets: [
            {
                label: "Revenue",
                data: revenueBreakdown.map((item) => item.amount), // Example: [1000, 2000]
                backgroundColor: "#4CAF50",
                borderWidth: 1,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    precision: 0,
                },
            },
        },
    };

    return (
        <div className="p-6">
            <h3 className="text-2xl font-bold mb-4">Revenue Overview</h3>

            {/* Total Revenue Card */}
            <div className="bg-green-100 p-6 rounded-lg shadow-md mb-6">
                <h4 className="text-xl font-semibold">Total Revenue</h4>
                <p className="text-3xl font-semibold text-green-700 mt-2">
                    PKR: {revenue.toLocaleString()}
                </p>
            </div>

            {/* Calculator Section */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-md mb-6">
                <h4 className="text-xl font-semibold mb-4">Revenue Calculator</h4>
                <div className="flex flex-col space-y-4">
                    {/* Input Section */}
                    <div className="flex items-center space-x-4">
                        <input
                            type="number"
                            className="border border-gray-300 rounded-md p-2 w-1/2"
                            placeholder="Enter amount"
                            value={calculatorInput}
                            onChange={handleCalculatorChange}
                        />
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                            onClick={() => updateRevenue("add")}
                        >
                            Add to Revenue
                        </button>
                        <button
                            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                            onClick={() => updateRevenue("subtract")}
                        >
                            Subtract from Revenue
                        </button>
                    </div>
                    {/* Error Message */}
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                </div>
            </div>

            {/* Recent Adjustments Log */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h4 className="text-xl font-semibold mb-4">Recent Adjustments</h4>
                {adjustments.length > 0 ? (
                    <ul className="space-y-2">
                        {adjustments.map((adjustment, index) => (
                            <li key={index} className="text-sm">
                                {adjustment.type === "add" ? "+" : "-"}PKR {adjustment.amount.toLocaleString()} (
                                {adjustment.timestamp})
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No adjustments made yet.</p>
                )}
            </div>
        </div>
    );
};

export default Revenue;
