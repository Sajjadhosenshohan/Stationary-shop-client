import React, { useState } from "react";
import { Layout, Menu, Button } from "antd";
import { Routes, Route, Navigate, Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import {
  ShoppingBag,
  Package,
  Settings,
  LayoutDashboard,
  FileText,
  Heart,
  CreditCard,
  UsersIcon,
  X,
} from "lucide-react";
import { MenuOutlined } from "@ant-design/icons";
import Overview from "./UserDashboardOverview";
import Orders from "./Orders";
import Products from "./Products";
import Wishlist from "./Wishlist";
import PaymentMethods from "./PaymentMethods";
import OrderHistory from "./OrderHistory";
import Users from "./Users";
import { ProfilePage } from "../profile";
import UserDashboardOverview from "./UserDashboardOverview";
import AdminDashboardOverview from "./AdminDashboardOverview";

const { Sider, Content } = Layout;

const Dashboard: React.FC = () => {
  const location = useLocation();
  const { user } = useSelector((state: RootState) => state.auth);
  const [collapsed, setCollapsed] = useState(true);

  const adminMenuItems = [
    {
      key: "/dashboard/admin-dashboard-overview",
      icon: <LayoutDashboard className="h-5 w-5" />,
      label: "Overview",
      path: "/dashboard/admin-dashboard-overview",
    },
    {
      key: "/dashboard/orders",
      icon: <ShoppingBag className="h-5 w-5" />,
      label: "Orders",
      path: "/dashboard/orders",
    },
    {
      key: "/dashboard/products",
      icon: <Package className="h-5 w-5" />,
      label: "Products",
      path: "/dashboard/products",
    },
    {
      key: "/dashboard/users",
      icon: <UsersIcon className="h-5 w-5" />,
      label: "Users",
      path: "/dashboard/users",
    },
    {
      key: "/dashboard/update-profile",
      icon: <UsersIcon className="h-5 w-5" />,
      label: "Profile",
      path: "/dashboard/update-profile",
    },
  ];

  const userMenuItems = [
    {
      key: "/dashboard/user-dashboard-overview",
      icon: <LayoutDashboard className="h-5 w-5" />,
      label: "Overview",
      path: "/dashboard/user-dashboard-overview",
    },
    {
      key: "/dashboard/order-history",
      icon: <FileText className="h-5 w-5" />,
      label: "Order History",
      path: "/dashboard/order-history",
    },
    {
      key: "/dashboard/update-profile",
      icon: <UsersIcon className="h-5 w-5" />,
      label: "Profile",
      path: "/dashboard/update-profile",
    },
  ];

  const menuItems = user?.role === "user" ? userMenuItems : adminMenuItems;

  return (
    <Layout className="min-h-screen">
      {collapsed && (
        <div className="md:hidden fixed top-4 left-4 z-50">
          <Button
            icon={<MenuOutlined />}
            onClick={() => setCollapsed(!collapsed)}
          />
        </div>
      )}
      <Sider
        theme="light"
        className={`border-r border-gray-200 ${
          collapsed ? "hidden" : "block"
        } md:block  relative md:relative z-40`}
        width={300}
        style={{ background: "#fff", height: "100vh", overflowY: "auto" }}
      >
        <div
          className="absolute top-6 right-2 z-50 rounded-full p-1 border border-red-500"
          onClick={() => setCollapsed(!collapsed)}
        >
          <X className="text-red-500" />
        </div>
        <div className="p-4">
          <h2 className="text-xl font-bold text-gray-800">
            {user?.role === "admin" ? "Admin Dashboard" : "My Account"}
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
      <Layout>
        <Content
          className="p-6 overflow-auto bg-gray-50"
          style={{ minHeight: "100vh" }}
        >
          <Routes>
            {/* admin route */}
            <Route path="/admin-dashboard-overview" element={<AdminDashboardOverview />} />
            <Route path="/update-profile" element={<ProfilePage />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/products" element={<Products />} />
            <Route path="/users" element={<Users />} />
            {/* user route */}
            <Route path="/user-dashboard-overview" element={<UserDashboardOverview />} />
            <Route path="/order-history" element={<OrderHistory />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
