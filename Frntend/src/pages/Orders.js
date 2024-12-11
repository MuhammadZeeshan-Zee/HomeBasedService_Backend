import React, { useState, useEffect } from "react";
import { Table, Select, Input, message, Modal } from "antd";
import axios from "axios";
import { Rate } from "antd";
import moment from "moment";
import { FaBook } from "react-icons/fa";
import { EnvironmentOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";

const { Option } = Select;
const { Search } = Input;

const Orders = () => {
  const [servicesData, setServicesData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState("");

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
          feedback: item.feedback, // Assuming the feedback is available in the API
          createdAt: item.createdAt,
        }));

        setServicesData(apiData);
        setFilteredData(apiData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  const onSearch = (value) => {
    setSearchText(value);
    const filtered = servicesData.filter((item) =>
      Object.values(item).some((val) =>
        String(val).toLowerCase().includes(value.toLowerCase())
      )
    );
    setFilteredData(filtered);
  };

  const handleStatusChange = async (value, key) => {
    const updatedData = servicesData.map((service) =>
      service.key === key ? { ...service, status: value } : service
    );
    setServicesData(updatedData);
    setFilteredData(updatedData);

    try {
      // Update order status
      await axios.put(
        `https://home-based-service-backend.vercel.app/user/updateOrderStatus/${key}`,
        { status: value },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      message.success("Status updated successfully");
    } catch (error) {
      message.error("Failed to update status or send feedback email.");
      console.error("Error:", error);
    }
  };

  const handleFeedbackClick = async (orderId) => {
    try {
      setLoading(true); // Show loading state while fetching feedback

      // Fetch feedback for the specific order using GET request
      const response = await axios.get(
        `http://localhost:4000/feedback/${orderId}`, // Use orderId in the API request
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pass token for authentication
          },
        }
      );

      const feedbackData = response.data.feedback;

      if (!feedbackData) {
        message.info("No feedback provided for this order.");
        return;
      }

      setSelectedFeedback(feedbackData); // Set the feedback data
      setIsModalVisible(true); // Show modal with feedback
    } catch (error) {
      console.error("Error fetching feedback:", error);
      message.error("Failed to fetch feedback. Please try again later.");
    } finally {
      setLoading(false);
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
      render: (status, record) => (
        <Select
          value={status}
          onChange={(value) => handleStatusChange(value, record.key)}
          style={{ borderRadius: "12px", padding: "4px 8px" }}
        >
          <Option value="Pending">Pending</Option>
          <Option value="Completed">Completed</Option>
          <Option value="Inprocess">Inprocess</Option>
          <Option value="Declined">Declined</Option>
        </Select>
      ),
    },
    {
      title: "Feedback",
      dataIndex: "feedback",
      key: "feedback",
      render: (_, record) =>
        record.status === "Completed" ? (
          <FaBook
            onClick={() => handleFeedbackClick(record.key)} // Pass the order ID or unique key
            style={{
              cursor: "pointer",
              color: "#1890ff",
              fontSize: "18px",
            }}
            title="View Feedback"
          />
        ) : null,
    },

    {
      title: "Map Address",
      dataIndex: "mapAddress",
      key: "mapAddress",
      render: (text) => (
        <Tooltip title="Open Location">
          <a
            href={text}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              color: "#1890ff",
            }}
          >
            <EnvironmentOutlined style={{ fontSize: "18px", marginRight: "8px" }} />
            View Location
          </a>
        </Tooltip>
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

        {/* Feedback Modal */}
        <Modal
          title={<h2 style={{ textAlign: "center", margin: 0 }}>Customer Feedback Invoice</h2>}
          visible={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={null}
          centered
        >
          {selectedFeedback && (
            <div style={{ padding: "20px", fontFamily: "Arial, sans-serif", lineHeight: "1.6" }}>
              {/* Header */}
              <div
                style={{
                  textAlign: "center",
                  marginBottom: "20px",
                  borderBottom: "2px solid #f0f0f0",
                  paddingBottom: "10px",
                }}
              >
                <h3 style={{ margin: 0, color: "#1890ff" }}>Invoice Details</h3>
              </div>

              {/* Customer Details */}
              <div style={{ marginBottom: "20px" }}>
                <p style={{ margin: "5px 0" }}>
                  <strong style={{ color: "#555" }}>Total Charges:</strong>{" "}
                  <span style={{ color: "#d9534f" }}>{selectedFeedback.totalCharges}</span>
                </p>
              </div>

              {/* Rating */}
              <div style={{ marginBottom: "20px" }}>
                <p style={{ margin: "5px 0" }}>
                  <strong style={{ color: "#555" }}>Rating:</strong>{" "}
                  <Rate disabled value={selectedFeedback.rating} style={{ fontSize: "16px" }} />
                </p>
              </div>

              {/* Feedback Section */}
              <div
                style={{
                  padding: "10px",
                  border: "1px solid #f0f0f0",
                  borderRadius: "8px",
                  backgroundColor: "#fafafa",
                }}
              >
                <h4 style={{ marginBottom: "8px", color: "#333" }}>Feedback:</h4>
                <p style={{ margin: 0, color: "#666" }}>{selectedFeedback.feedback}</p>
              </div>

              {/* Close Button */}
              <div style={{ marginTop: "20px", textAlign: "center" }}>
                <button
                  onClick={() => setIsModalVisible(false)}
                  style={{
                    backgroundColor: "#1890ff",
                    color: "#fff",
                    padding: "10px 20px",
                    borderRadius: "6px",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default Orders;
