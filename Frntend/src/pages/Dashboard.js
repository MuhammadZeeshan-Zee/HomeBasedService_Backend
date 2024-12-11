
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import "@fortawesome/fontawesome-free/css/all.min.css";

// Register necessary chart components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

const Dashboard = () => {
  const [count, setCount] = useState({
    customer: 0,
    book: 0,
    employee: 0,
  });
  const authData = localStorage.getItem("auth");

  const authObject = JSON.parse(authData);
  console.log("authObject", authObject);

  const token = authObject?.accessToken;
  console.log("token", token);
  useEffect(() => {
    getData();
    // getEmployedata();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const getData = async () => {
    try {
      const response = await axios.get(
        "https://home-based-service-backend.vercel.app/user/getAllOrders",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("response", response);
      console.log("response.data.data.count", response.data.data.count);

      const dataGet = await axios.get(
        "https://home-based-service-backend.vercel.app/employee/employeeCount",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("dataGet", dataGet);

      const customerResposne = await axios.get(
        "https://home-based-service-backend.vercel.app/user/getAllUsers",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("customerResposne", customerResposne);

      // Assuming response.data.users and response.data.bookings are arrays
      setCount({
        book: response.data.data.count,
        employee: dataGet.data.data,
        customer: customerResposne.data.data.count,
      });
      console.log(response.data.count); // Log the count of booked orders
      console.log(customerResposne.data.count);
    } catch (error) {
      console.error("Error fetching user and booking data:", error);
    }
  };

  const chartData = {
    labels: ["Customers", "Orders", "Employees"],
    datasets: [
      {
        data: [count.customer, count.book, count.employee],
        backgroundColor: ["#FFCE56", "#36A2EB", "#4CAF50"], // Yellow for customers, Blue for orders, Green for employees
        hoverBackgroundColor: ["#FFCE56", "#36A2EB", "#4CAF50"], // Same hover colors
      },
    ],
  };

  const barOptions = {
    indexAxis: 'y', // Makes the bar chart horizontal, similar in layout to a pie chart
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          precision: 0,
        },
      },
      y: {
        ticks: {
          color: "#4A5568", // Adjust y-axis label color if needed
        },
      },
    },
    plugins: {
      legend: {
        display: false, // Hide legend to keep it similar to pie chart
      },
    },
  };

  return (
    <div className=''>
      <h3 className='mb-4 text-xl'>Dashboard</h3>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-6'>
        {/* Orders Card */}
        <div className='bg-gray-100 p-10 rounded-lg shadow-md text-center hover:bg-gray-200 transition duration-300 cursor-pointer'>
          <i className='fas fa-box text-5xl mb-4 text-blue-500'></i>
          <div className='text-2xl mb-2'>Orders</div>
          <div className='text-3xl font-semibold text-gray-700 mt-4'>
            {count.book}
          </div>
        </div>

        {/* Employees Card */}
        <div className='bg-gray-100 p-10 rounded-lg shadow-md text-center hover:bg-gray-200 transition duration-300 cursor-pointer'>
          <i className='fas fa-users text-5xl mb-4 text-green-500'></i>
          <div className='text-2xl mb-2'>Employees</div>
          <div className='text-3xl font-semibold text-gray-700 mt-4'>
            {count.employee}
          </div>
        </div>

        {/* Customers Card */}
        <div className='bg-gray-100 p-10 rounded-lg shadow-md text-center hover:bg-gray-200 transition duration-300 cursor-pointer'>
          <i className='fas fa-user text-5xl mb-4 text-yellow-500'></i>
          <div className='text-2xl mb-2'>Customers</div>
          <div className='text-3xl font-semibold text-gray-700 mt-4'>
            {count.customer}
          </div>
        </div>

        {/* Revenue Card */}
        <div className="bg-gray-100 p-10 rounded-lg shadow-md text-center hover:bg-gray-200 transition duration-300 cursor-pointer">
          <i className="fas fa-dollar-sign text-5xl mb-4 text-purple-500"></i>
          <div className="text-2xl mb-2">Revenue</div>
          <div className="text-3xl font-semibold text-gray-700 mt-4">
            {/* ${count.revenue.toLocaleString()} */}
          </div>
        </div>
      </div>

      {/* Pie and Histogram Charts */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        {/* Pie Chart */}
        <div className='bg-white p-4 rounded-lg shadow-sm'>
          <h4 className='mb-4 text-lg'>
            Customer, Orders, and Employees Overview
          </h4>
          <div className='w-80 h-auto lg:w-80 lg:h-auto'>
            <Pie data={chartData} />
          </div>
        </div>

        {/* Histogram (Bar) Chart */}
        <div className='bg-white p-4 rounded-lg shadow-sm'>
          <h4 className='mb-4 text-lg'>
            Histogram of Customers, Orders, and Employees
          </h4>
          <div className='w-80 h-auto lg:w-80 lg:h-auto'>
            <Bar data={chartData} options={barOptions} />
          </div>
        </div>
      </div>
      
    </div>
  );

};

export default Dashboard;
