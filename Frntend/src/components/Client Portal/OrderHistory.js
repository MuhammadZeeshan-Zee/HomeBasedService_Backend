import React, { useState, useEffect } from "react";
import { Table, Select, message } from "antd";
import axios from "axios";
import moment from "moment"; // For formatting dates
import "@fortawesome/fontawesome-free/css/all.min.css";

const { Option } = Select;

const OrderHistory = () => {
    const [servicesData, setServicesData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(true);
    const authData = localStorage.getItem("auth");
    const authObject = JSON.parse(authData);
    const token = authObject?.accessToken;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    "https://home-based-service-backend.vercel.app/user/bookedHistory",
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                console.log("response", response);

                const apiData = response.data.data.map((item) => ({
                    
                    key: item._id,
                    
                    name: `${item.firstName} ${item.lastName}`,
                    email: item.email,
                    phone: item.phoneNumber,
                    service: item.serviceName,
                    address: item.address,
                    mapAddress: item.mapAddress,
                    status: item.status,
                    createdAt: item.createdAt, // Assuming the backend provides this field
                }));

                setServicesData(apiData);
                setFilteredData(apiData); // Set filtered data initially
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Handle status change
    const handleStatusChange = async (value, key) => {
        const updatedData = servicesData.map((service) =>
            service.key === key ? { ...service, status: value } : service
        );
        setServicesData(updatedData);
        setFilteredData(updatedData); // Ensure filtered data updates as well

        try {
            await axios.put(
                `https://home-based-service-backend.vercel.app/user/updateOrderStatus/${key}`,
                {
                    status: value,
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            message.success("Status updated successfully");
        } catch (error) {
            message.error("Failed to update status");
            console.error("Error updating status:", error);
        }
    };

    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Phone",
            dataIndex: "phone",
            key: "phone",
        },
        {
            title: "Service",
            dataIndex: "service",
            key: "service",
        },
        {
            title: "Address",
            dataIndex: "address",
            key: "address",
        },
        {
            title: "Date & Time",
            dataIndex: "createdAt",
            key: "createdAt",
            render: (text) => (
                <span>
                    {moment(text).format("MMMM Do YYYY, h:mm A")} <br />
                    ({moment(text).format("dddd")})
                </span>
            ),
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (status) => (
                // Displaying status as text
                <span className="inline-block py-2 px-4 rounded-lg bg-gray-100 text-center text-sm">
                    {status}
                </span>
            ),
        },
    ];

    return (
        <div className="bg-gray-100 min-h-screen py-6 px-4 md:px-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="mb-4 text-xl font-semibold text-gray-800 md:text-2xl">
                    Orders History
                </h3>

                {/* Orders Table */}
                <div className="overflow-x-auto">
                    <Table
                        columns={columns}
                        dataSource={filteredData}
                        loading={loading}
                        pagination={{
                            pageSize: 10,
                            total: filteredData.length,
                            showSizeChanger: false,
                            defaultCurrent: 1,
                        }}
                        scroll={{ x: true }} // Allows horizontal scrolling for large tables on smaller screens
                    />
                </div>
            </div>
        </div>
    );
};

export default OrderHistory;
