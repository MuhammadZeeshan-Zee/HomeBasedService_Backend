/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Table, Button, Space, Input, message } from "antd";
import axios from "axios";

const { Search } = Input;

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const authData = localStorage.getItem("auth");
  const authObject = JSON.parse(authData);

  const token = authObject?.accessToken;

  // Fetch customers and set action as status
  const fetchCustomers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/user/getAllUsers",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Initialize customers with the existing action field
      const usersWithStatus = response.data.data.users.map((user) => ({
        ...user,
      }));

      setCustomers(usersWithStatus);
      setFilteredCustomers(usersWithStatus); // Set filtered customers initially
    } catch (error) {
      console.error("Error fetching customer data:", error);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  // Function to handle block/unblock action
  const handleBlockUnblock = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:4000/user/updateUserAction/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      message.success("Action updated successfully");

      const newAction = response.data.data.action; // Get updated action status

      // Update customers data with new action
      const updatedCustomers = customers.map((customer) => {
        if (customer._id === id) {
          return { ...customer, action: newAction };
        }
        return customer;
      });

      setCustomers(updatedCustomers);
      setFilteredCustomers(updatedCustomers); // Update filtered data as well
    } catch (error) {
      console.error("Error updating customer status:", error);
    }
  };

  // Handle search input change
  const onSearch = (value) => {
    setSearchText(value);
    const filtered = customers.filter((item) =>
      Object.values(item).some((val) =>
        String(val).toLowerCase().includes(value.toLowerCase())
      )
    );
    setFilteredCustomers(filtered);
  };

  const highlightText = (text) => {
    if (!text) return ""; // Return an empty string if text is undefined or null
    if (!searchText) return text; // Return the original text if there is no search text

    const regex = new RegExp(`(${searchText})`, "gi");
    const parts = text.toString().split(regex); // Convert text to a string before splitting

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

  const columns = [
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
      render: (text) => <span>{highlightText(text)}</span>,
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
      render: (text) => <span>{highlightText(text)}</span>,
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      render: (text) => <span>{highlightText(text)}</span>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text) => <span>{highlightText(text)}</span>,
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button
            type="link"
            style={{
              backgroundColor: record.action ? "#52c41a" : "#FF0000",
              color: "#fff",
              borderRadius: "4px",
              padding: "4px 8px",
              fontWeight: "bold",
            }}
            onClick={() => handleBlockUnblock(record._id)}
          >
            {record.action ? "UnBlock" : "Block"}
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Customers</h2>
        <Search
          placeholder="Search customers"
          enterButton
          value={searchText}
          onChange={(e) => onSearch(e.target.value)}
          className="mb-4"
        />
        <Table
          dataSource={filteredCustomers}
          columns={columns}
          rowKey="_id"
          pagination={{ pageSize: 10 }}
        />
      </div>
    </div>
  );
};

export default Customers;
