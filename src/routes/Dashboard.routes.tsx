import React from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { Layout, Menu } from 'antd';
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
      <Sider theme="light" className="border-r border-gray-200" width={250} style={{ background: '#fff' }}>
        <div className="p-4">
          <h2 className="text-xl font-bold text-gray-800">
            {user?.role === 'admin' ? 'Admin Dashboard' : 'My Account'}
          </h2>
        </div>
        <Menu
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems.map((item) => ({
            key: item.key,
            icon: item.icon,
            label: <Link to={item.path}>{item.label}</Link>,
          }))}
        />
      </Sider>
      <Content className="bg-gray-50 p-6">
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
    ],
  },
]);

const Dashboard: React.FC = () => {
  return <RouterProvider router={dashboardRouter} />;
};

export default Dashboard;