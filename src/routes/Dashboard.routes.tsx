import React, { useState } from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { Layout, Menu, Button } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { adminMenuItems, userMenuItems } from './route.const';

const { Sider, Content } = Layout;

const DashboardLayout: React.FC = () => {
  const location = useLocation();
  const { user } = useSelector((state: RootState) => state.auth);

  const menuItems = user?.role === 'admin' ? adminMenuItems : userMenuItems;

  return (
    <Layout className="min-h-screen">
      {/* Toggle Button for Small Screens */}
      {/* <Button
        className="md:hidden fixed top-4 left-4 z-50"
        icon={<MenuOutlined />}
        onClick={() => setCollapsed(!collapsed)}
      /> */}

      {/* Sidebar */}
      <Sider
        theme="light"
        className={`border-r border-gray-200  z-40`}
        width={250}
        style={{ background: '#fff', height: '100vh', overflowY: 'auto' }}
      >
        <div className="p-4">
          <h2 className="text-xl font-bold text-gray-800">
            {user?.role === 'admin' ? 'Admin Dashboard' : 'My Account'}
          </h2>
        </div>
        <Menu
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems?.map((item) => ({
            key: item.key,
            icon: item.icon,
            label: <Link to={item.path}>{item.label}</Link>,
          }))}
        />
      </Sider>

      {/* Content */}
      <Content className="bg-gray-50 p-6 md:ml-0">
        <Outlet />
      </Content>
    </Layout>
  );
};

const dashboardRouter = createBrowserRouter([
  {
    path: '/dashboard',
    element: <DashboardLayout />,
    children: [
      // Add your child routes here if needed
    ],
  },
]);

const Dashboard: React.FC = () => {
  return <RouterProvider router={dashboardRouter} />;
};

export default Dashboard;