import React, { useState, useEffect } from 'react';
import { Table, Button, Space, Modal, Form, Input, message } from 'antd';
import axios from 'axios';

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
            const response = await axios.get('http://localhost:4000/service/readallServices', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setServices(Array.isArray(response.data.data) ? response.data.data : []);
        } catch (error) {
            console.error('Error fetching services:', error);
            message.error('Failed to fetch services.');
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:4000/service/deleteService/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
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

            try {
                if (editingService) {
                    await axios.put(
                        `http://localhost:4000/service/updateService/${editingService._id}`,
                        values,
                        { headers: { Authorization: `Bearer ${token}` } }
                    );
                    message.success('Service updated successfully');
                } else {
                    await axios.post('http://localhost:4000/service/addService', values, {
                        headers: { Authorization: `Bearer ${token}` },
                    });
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

    const filteredServices = services.filter((service) =>
        ['name', 'description'].some((key) =>
            (service[key] || '').toLowerCase().includes(searchText.toLowerCase())
        )
    );

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
            render: (text) => (text ? <img src={text} alt="Service" style={{ width: '50px' }} /> : 'No Image'),
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
                dataSource={filteredServices}
                pagination={{ pageSize: 10 }}
                rowKey="_id"
                className="bg-white"
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
                ]}
            >
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
                        rules={[{ required: true, message: 'Please upload an image!' }]}
                    >
                        <Input type="file" />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default ManageServices;
