import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {
  ShoppingBag,
  Package,
  Settings,
  LayoutDashboard,
  FileText,
  Heart,
  CreditCard,
  UsersIcon,
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Overview from './Overview';
import Orders from './Orders';
import Products from './Products';
import Wishlist from './Wishlist';
import PaymentMethods from './PaymentMethods';
import OrderHistory from './OrderHistory';
import Users from './Users';
import { RootState } from '../../redux/store';

const { Sider, Content } = Layout;

const Dashboard: React.FC = () => {
  const location = useLocation();
  const { user } = useSelector((state: RootState) => state.auth);

  const adminMenuItems = [
    {
      key: '/dashboard',
      icon: <LayoutDashboard className="h-5 w-5" />,
      label: 'Overview',
      path: '/dashboard',
    },
    {
      key: '/dashboard/orders',
      icon: <ShoppingBag className="h-5 w-5" />,
      label: 'Orders',
      path: '/dashboard/orders',
    },
    {
      key: '/dashboard/products',
      icon: <Package className="h-5 w-5" />,
      label: 'Products',
      path: '/dashboard/products',
    },
    {
      key: '/dashboard/users',
      icon: <UsersIcon className="h-5 w-5" />,
      label: 'Users',
      path: '/dashboard/users',
    },
    {
      key: '/dashboard/settings',
      icon: <Settings className="h-5 w-5" />,
      label: 'Settings',
      path: '/dashboard/settings',
    },
  ];

  const userMenuItems = [
    {
      key: '/dashboard',
      icon: <LayoutDashboard className="h-5 w-5" />,
      label: 'Overview',
      path: '/dashboard',
    },
    {
      key: '/dashboard/order-history',
      icon: <FileText className="h-5 w-5" />,
      label: 'Order History',
      path: '/dashboard/order-history',
    },
    {
      key: '/dashboard/wishlist',
      icon: <Heart className="h-5 w-5" />,
      label: 'Wishlist',
      path: '/dashboard/wishlist',
    },
    {
      key: '/dashboard/payment-methods',
      icon: <CreditCard className="h-5 w-5" />,
      label: 'Payment Methods',
      path: '/dashboard/payment-methods',
    },
    {
      key: '/dashboard/settings',
      icon: <Settings className="h-5 w-5" />,
      label: 'Settings',
      path: '/dashboard/settings',
    },
  ];

  const menuItems = user?.role === 'user' ? userMenuItems : adminMenuItems ;

  return (
    <Layout className="min-h-screen">
      <Sider
        theme="light"
        className="border-r border-gray-200"
        width={250}
        style={{ background: '#fff' }}
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
      <Content className="bg-gray-50 p-6">
        <Routes>
          <Route path="/" element={<Overview />} />
          
          {/* Admin Routes */}
          <Route
            path="/orders"
            element={
              // <PrivateRoute requireAdmin>
                <Orders />
              // </PrivateRoute>
            }
          />
          <Route
            path="/products"
            element={
              // <PrivateRoute requireAdmin>
                <Products />
              // </PrivateRoute>
            }
          />
          <Route
            path="/users"
            element={
              // <PrivateRoute requireAdmin>
                <Users />
              // </PrivateRoute>
            }
          />

          {/* User Routes */}
          <Route path="/order-history" element={<OrderHistory />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/payment-methods" element={<PaymentMethods />} />
          
          {/* Common Routes */}
          <Route path="/settings" element={<Settings />} />
          
          {/* Fallback */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Content>
    </Layout>
  );
};

export default Dashboard;