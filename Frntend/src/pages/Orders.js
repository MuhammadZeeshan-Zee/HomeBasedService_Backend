import React, { useState, useEffect } from "react";
import { Table, Select, Input, message } from "antd";
import axios from "axios";
import moment from "moment"; // For formatting dates
import "@fortawesome/fontawesome-free/css/all.min.css";

const { Option } = Select;
const { Search } = Input;

const Orders = () => {
  const [servicesData, setServicesData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const authData = localStorage.getItem("auth");

  const authObject = JSON.parse(authData);

  const token = authObject?.accessToken;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://home-based-service-backend.vercel.app/user/getAllOrders",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const apiData = response.data.data.bookedOrders.map((item) => ({
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

  // Handle search input change
  const onSearch = (value) => {
    setSearchText(value);
    const filtered = servicesData.filter((item) =>
      Object.values(item).some((val) =>
        String(val).toLowerCase().includes(value.toLowerCase())
      )
    );
    setFilteredData(filtered);
  };

  // Highlight searched text
  const highlightText = (text) => {
    if (!searchText) return text;
    const regex = new RegExp(`(${searchText})`, "gi");
    const parts = text.split(regex);
    return parts.map((part, index) =>
      part.toLowerCase() === searchText.toLowerCase() ? (
        <span
          key={index}
          style={{ backgroundColor: "yellow", fontWeight: "bold" }}
        >
          {part}
        </span>
      ) : (
        part
      )
    );
  };

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
      render: (text) => <span>{highlightText(text)}</span>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text) => <span>{highlightText(text)}</span>,
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      render: (text) => <span>{highlightText(text)}</span>,
    },
    {
      title: "Service",
      dataIndex: "service",
      key: "service",
      render: (text) => <span>{highlightText(text)}</span>,
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      render: (text) => <span>{highlightText(text)}</span>,
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
      render: (status, record) => (
        <Select
          value={status}
          onChange={(value) => handleStatusChange(value, record.key)}
          style={{
            borderRadius: "12px",
            padding: "4px 8px",
          }}
        >
          <Option value="Pending">Pending</Option>
          <Option value="Completed">Completed</Option>
        </Select>
      ),
    },
    {
      title: "Map Address",
      dataIndex: "mapAddress",
      key: "mapAddress",
      render: (text) => (
        <a
          href={text}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            wordWrap: "break-word",
            wordBreak: "break-word",
            whiteSpace: "normal",
            color: "#1890ff",
          }}
        >
          {highlightText(text)}
        </a>
      ),
    },
  ];

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="mb-4 text-xl font-semibold">Orders</h3>

        {/* Search input */}
        <Search
          placeholder="Search orders"
          enterButton
          value={searchText}
          onChange={(e) => onSearch(e.target.value)}
          className="mb-4"
        />

        {/* Orders Table */}
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
        />
      </div>
    </div>
  );
};

export default Orders;
