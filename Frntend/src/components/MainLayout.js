import React, { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { AiOutlineDashboard, AiOutlineUser } from "react-icons/ai";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Outlet } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { Layout, Menu, Dropdown, Avatar, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { removeUserInfo } from "../features/auth/authSlice";
import profileLogo from '../assests/images/user.png';


// eslint-disable-next-line no-unused-vars
const { Header, Sider, Content } = Layout;


const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const handleMenuClick = ({ key }) => {
    if (key === "signout") {
      localStorage.clear();
      // Handle signout logic here
      navigate("/login"); // Redirect to login page after signout
    }
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="signout">Sign Out</Menu.Item>
    </Menu>
  );

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
          <h2 className="text-white fs-5 text-center py-3 mb-0 rounded">
            <span className="sm-logo font-bold pt-1 text-lg">HS</span>
            <span className="lg-logo font-bold mt-5 text-xl">Home Service</span>
          </h2>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[""]}
          onClick={({ key }) => {
            if (key === "signout") {
              dispatch(removeUserInfo())
            } else {
              navigate(key);
            }
          }}
          items={[
            {
              key: "",
              icon: <AiOutlineDashboard className="fs-4" />,
              label: "Dashboard",
            },
            {
              key: "Catalog",
              icon: <AiOutlineUser className="fs-4" />,
              label: "Pages",
              children: [
                {
                  key: "orders",
                  label: "Orders",
                },
                {
                  key: "customers",
                  label: "Customers",
                },
                {
                  key: "employees",
                  label: "Employees",
                },
                {
                  key: "ManageServices",
                  label: "Manage Services",
                },
              ],
            },
          ]}
        />
      </Sider>

      <Layout className="site-layout">
        <header
          className="flex flex-col sm:flex-row justify-between items-center px-2 sm:px-5 py-2 sm:py-0"
          style={{ background: "#fff" }}
        >
          <div className="flex items-center w-full sm:w-auto">
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "text-2xl trigger cursor-pointer",
                onClick: () => setCollapsed(!collapsed),
              }
            )}
            <div className="ml-4">
              <h3 className="text-lg sm:text-xl font-bold">Admin Dashboard</h3>
              <p className="text-sm text-gray-500">Manage your services</p>
            </div>
          </div>

          <div className="flex items-center space-x-4 sm:space-x-8 mt-2 sm:mt-0">
            {/* <div className="relative">
              <IoIosNotifications className="text-xl" />
              <p
                className="bg-yellow-500 text-white rounded-full px-2 py-1 absolute text-xs flex items-center justify-center"
                style={{
                  top: "-5px",
                  right: "-5px",
                  width: "20px",
                  height: "20px",
                }}
              >
                3
              </p>
            </div> */}
            <Dropdown overlay={menu} trigger={['click']}>
            <div className="relative flex items-center cursor-pointer">
  <img
    src={profileLogo}
    alt="Avatar"
    className="w-10 h-10 rounded-full"
  />
  <div className="ml-2 hidden sm:block">
    <p className="text-xs text-gray-500">Admin</p>
    <p className="text-xs text-gray-500">Admin@gmail.com</p>
  </div>
</div>

            </Dropdown>
          </div>
        </header>

        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: "#fff",
          }}
        >
          <ToastContainer
            position="top-right"
            autoClose={250}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            theme="light"
          />
          <Outlet />
        </Content>
      </Layout>
      
    </Layout>
  );
};

export default MainLayout;
