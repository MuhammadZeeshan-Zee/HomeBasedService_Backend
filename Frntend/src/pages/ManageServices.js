/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Table, Button, Space, Modal, Form, Input, message } from 'antd';
import axios from 'axios';
import { Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const { Search } = Input;

const ManageServices = () => {
    const [services, setServices] = useState([]); // List of services
    const [modalState, setModalState] = useState({ isVisible: false, editingService: null }); // Modal visibility and editing state
    const [searchText, setSearchText] = useState(''); // Search input
    const [form] = Form.useForm();
    const token = JSON.parse(localStorage.getItem('auth'))?.accessToken;

    // Fetch all services on component mount
    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            const response = await axios.get('http://localhost:4000/service/readAllService');
            const servicesData = Array.isArray(response.data.data.services)
                ? response.data.data.services
                : [];
            setServices(servicesData);
        } catch (error) {
            console.error('Error fetching services:', error);
            message.error('Failed to fetch services.');
        }
    };


    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:4000/service/deleteService/${id}`);
            message.success('Service deleted successfully');
            fetchServices();
        } catch (error) {
            console.error('Error deleting service:', error);
            message.error('Failed to delete service.');
        }
    };

    const openModal = (service = null) => {
        setModalState({ isVisible: true, editingService: service });
        if (service) {
            form.setFieldsValue({
                name: service.name,
                description: service.description,
                image: service.image,
            });
        } else {
            form.resetFields();
        }
    };

    const closeModal = () => {
        setModalState({ isVisible: false, editingService: null });
        form.resetFields();
    };
    const handleSave = () => {
        form.validateFields().then(async (values) => {
            const { editingService } = modalState;

            // Create FormData and append fields
            const formData = new FormData();
            formData.append('name', values.name);
            formData.append('description', values.description);

            // Append the image file if provided
            if (values.image) {
                formData.append('image', values.image.originFileObj);
            }

            try {
                if (editingService) {
                    // Update service API call
                    await axios.put(
                        `http://localhost:4000/service/updateService/${editingService._id}`,
                        formData);
                    message.success('Service updated successfully');
                } else {
                    // Add service API call
                    await axios.post('http://localhost:4000/service/addService',formData);
                    message.success('Service added successfully');
                }
                fetchServices();
                closeModal();
            } catch (error) {
                console.error('Error saving service:', error);
                message.error('Failed to save service.');
            }
        });
    };



    const getHighlightedText = (text, highlight) => {
        if (!highlight) return text;
        const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
        return parts.map((part, index) =>
            part.toLowerCase() === highlight.toLowerCase() ? (
                <span key={index} style={{ backgroundColor: 'yellow' }}>{part}</span>
            ) : (
                part
            )
        );
    };

    const filteredServices = Array.isArray(services)
        ? services.filter((service) =>
            ['name', 'description'].some((key) =>
                (service[key] || '').toLowerCase().includes(searchText.toLowerCase())
            )
        )
        : [];


    const columns = [
        {
            title: 'Service Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => getHighlightedText(text, searchText),
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            render: (text) => getHighlightedText(text, searchText),
        },
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            render: (text) =>
                text ? (
                    <img src={text} alt="Service" style={{ width: '50px', borderRadius: '5px' }} />
                ) : (
                    'No Image'
                ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button type="link" onClick={() => openModal(record)}>Edit</Button>
                    <Button type="link" onClick={() => handleDelete(record._id)}>Delete</Button>
                </Space>
            ),
        },
    ];

    return (
        <div className="p-4 bg-white shadow-lg rounded-lg">
            <h3 className="mb-4 text-xl">Manage Services</h3>

            <Search
                placeholder="Search by Name or Description"
                onChange={(e) => setSearchText(e.target.value)}
                enterButton
                className="mb-4"
            />

            <Button type="primary" className="mb-4" onClick={() => openModal()}>
                Add Service
            </Button>

            <Table
                columns={columns}
                dataSource={filteredServices} // Use filteredServices if filtering is implemented
                pagination={{ pageSize: 10 }}
                rowKey="_id"
            />

            <Modal
                title={modalState.editingService ? 'Edit Service' : 'Add Service'}
                visible={modalState.isVisible}
                onCancel={closeModal}
                footer={[
                    <Button key="cancel" onClick={closeModal}>
                        Cancel
                    </Button>,
                    <Button key="submit" type="primary" onClick={handleSave}>
                        {modalState.editingService ? 'Update' : 'Add'}
                    </Button>,
                ]}>
                
                <Form form={form} layout="vertical">
                    <Form.Item
                        name="name"
                        label="Service Name"
                        rules={[{ required: true, message: 'Please input the service name!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="description"
                        label="Description"
                        rules={[{ required: true, message: 'Please input the description!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="image"
                        label="Image"
                        valuePropName="file"
                        getValueFromEvent={(e) => {
                            // Ensure we extract the correct file object from the event
                            if (e && e.fileList) {
                                return e.fileList[0]; // Return the first file in the list
                            }
                            return null;
                        }}
                        rules={[{ required: true, message: 'Please upload an image!' }]}
                    >
                        <Upload
                            listType="picture"
                            maxCount={1} // Limit to one file
                            beforeUpload={() => false} // Prevent automatic upload
                        >
                            <Button icon={<UploadOutlined />}>Click to Upload</Button>
                        </Upload>
                    </Form.Item>

                </Form>

            </Modal>
        </div>
    );
};

export default ManageServices;
