/* eslint-disable no-use-before-define */
import React, { useState, useEffect } from 'react';
import { Table, Button, Space, Modal, Form, Input, message, Select } from 'antd';
import axios from 'axios';

const { Option } = Select;
const { Search } = Input;

const Employees = () => {
  const [employees, setEmployees] = useState([]); // Ensure it's an array by default
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [searchText, setSearchText] = useState(''); // State to store search input
  const authData = localStorage.getItem('auth');
  const authObject = JSON.parse(authData);
  const token = authObject?.accessToken;

  useEffect(() => {
    fetchEmployees();
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchEmployees = async () => {
    try {
      const response = await axios.get('https://home-based-service-backend.vercel.app/employee/readallEmployee', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEmployees(Array.isArray(response.data.data) ? response.data.data : []);
    } catch (error) {
      console.error('Error fetching employees:', error);
      message.error('Failed to fetch employees.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://home-based-service-backend.vercel.app/employee/deleteEmployee/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      message.success('Employee deleted successfully');
      fetchEmployees();
    } catch (error) {
      console.error('Error deleting employee:', error);
      message.error('Failed to delete employee.');
    }
  };

  const handleAdd = () => {
    setIsModalVisible(true);
    setEditingEmployee(null);
  };

  const handleEdit = (employee) => {
    setEditingEmployee(employee);
    form.setFieldsValue({
      firstname: employee.firstname,
      lastName: employee.lastName,
      email: employee.email,
      phoneNumber: employee.phoneNumber,
      category: employee.category,
      address: employee.address
    });
    setIsModalVisible(true);
  };

  const handleModalAdd = () => {
    form.validateFields().then(async (values) => {
      if (editingEmployee) {
        try {
          await axios.put(
            `https://home-based-service-backend.vercel.app/employee/updateEmployee/${editingEmployee._id}`,
            values,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          message.success('Employee updated successfully');
        } catch (error) {
          console.error('Error updating employee:', error);
          message.error('Failed to update employee.');
        }
      } else {
        try {
          await axios.post('https://home-based-service-backend.vercel.app/employee/addEmployee', values, {
            headers: { Authorization: `Bearer ${token}` },
          });
          message.success('Employee added successfully');
        } catch (error) {
          console.error('Error adding employee:', error);
          message.error('Failed to add employee.');
        }
      }
      fetchEmployees();
      setIsModalVisible(false);
      form.resetFields();
    });
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const getHighlightedText = (text, highlight) => {
    if (!highlight) return text;
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return parts.map((part, index) =>
      part.toLowerCase() === highlight.toLowerCase() ? (
        <span key={index} style={{ backgroundColor: 'yellow' }}>
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  const filteredData = employees.filter((employee) =>
    ['firstname', 'lastName', 'email', 'phoneNumber']
      .some((key) =>
        (employee[key] || '').toLowerCase().includes(searchText.toLowerCase())
      )
  );

  const columns = [
    {
      title: 'First Name',
      dataIndex: 'firstname',
      key: 'firstname',
      render: (text) => getHighlightedText(text, searchText),
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      key: 'lastName',
      render: (text) => getHighlightedText(text, searchText),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (text) => getHighlightedText(text, searchText),
    },
    {
      title: 'Phone',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      render: (text) => getHighlightedText(text, searchText),
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      render: (text) => getHighlightedText(text, searchText),
    },

    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: (text) => getHighlightedText(text, searchText),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Button type="link" onClick={() => handleEdit(record)}>Edit</Button>
          <Button type="link" onClick={() => handleDelete(record._id)}>Delete</Button>
        </Space>
      ),
    },
    {
      title: 'Assign Task',
      key: 'assign',
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="link"
            href={`mailto:${record.email}`}
            target="_blank"
            style={{ color: "#1890ff" }}
          >
            Email
          </Button>
          <Button
            type="link"
            href={`https://wa.me/${record.phoneNumber}`}
            target="_blank"
            style={{ color: "#25D366" }}
          >
            WhatsApp
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg">
      <h3 className="mb-4 text-xl">Employee Table</h3>

      <Search
        placeholder="Search by Name, Username, Email, or Phone"
        onChange={(e) => setSearchText(e.target.value)}
        enterButton
        className="mb-4"
      />

      <Button type="primary" className="mb-4" onClick={handleAdd}>
        Add Employee
      </Button>

      <Table
        columns={columns}
        dataSource={filteredData}
        pagination={{ pageSize: 10 }}
        rowKey="_id"
        className="bg-white"
      />

      <Modal
        title={editingEmployee ? 'Edit Employee' : 'Add Employee'}
        visible={isModalVisible}
        onCancel={handleModalCancel}
        footer={[
          <Button key="cancel" onClick={handleModalCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleModalAdd}>
            {editingEmployee ? 'Update' : 'Add'}
          </Button>,
        ]}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="firstname"
            label="First Name"
            rules={[{ required: true, message: 'Please input the name!' }]}
          >
            <Input placeholder="Enter your first name" />
          </Form.Item>

          <Form.Item
            name="lastName"
            label="Last Name"
            rules={[{ required: true, message: 'Please input the last name!' }]}
          >
            <Input placeholder="Enter your last name" />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: 'Please input the email!' }]}
          >
            <Input placeholder="Enter your email address" />
          </Form.Item>

          <Form.Item
            name="phoneNumber"
            label="Phone"
            rules={[{ required: true, message: 'Please input the phone number!' }]}
          >
            <Input placeholder="3175110179" />
          </Form.Item>

          <Form.Item
            name="address"
            label="Address"
            rules={[{ required: true, message: 'Please input the location!' }]}
          >
            <Input placeholder="Enter your address" />
          </Form.Item>

          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true, message: 'Please select a category!' }]}
          >
            <Select placeholder="Select a category">
              <Option value="Paint Services">Paint Services</Option>
              <Option value="House Cleaning Service">House Cleaning Service</Option>
              <Option value="Electrician Service">Electrician Service</Option>
              <Option value="Plumber Services">Plumber Services</Option>
              <Option value="AC/Fridge Services">AC/Fridge Services</Option>
              <Option value="Carpet Cleaning Services">Carpet Cleaning Services</Option>
            </Select>
          </Form.Item>
        </Form>


      </Modal>
    </div>
  );
};

export default Employees;
