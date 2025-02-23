import React from "react";
import { Layout, Menu } from "antd";
import { Routes, Route, Navigate, Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  ShoppingBag,
  Package,
  Settings,
  LayoutDashboard,
  FileText,
  Heart,
  CreditCard,
  UsersIcon,
} from "lucide-react";
import Overview from "./Overview";
import Orders from "./Orders";
import Products from "./Products";
import Wishlist from "./Wishlist";
import PaymentMethods from "./PaymentMethods";
import OrderHistory from "./OrderHistory";
import Users from "./Users";
import { RootState } from "../../redux/store";
import { ProfilePage } from "../profile";

const { Sider, Content } = Layout;

const Dashboard: React.FC = () => {
  const location = useLocation();
  const { user } = useSelector((state: RootState) => state.auth);

  const adminMenuItems = [
    { key: "/dashboard", icon: <LayoutDashboard className="h-5 w-5" />, label: "Overview", path: "/dashboard" },
    { key: "/dashboard/orders", icon: <ShoppingBag className="h-5 w-5" />, label: "Orders", path: "/dashboard/orders" },
    { key: "/dashboard/products", icon: <Package className="h-5 w-5" />, label: "Products", path: "/dashboard/products" },
    { key: "/dashboard/users", icon: <UsersIcon className="h-5 w-5" />, label: "Users", path: "/dashboard/users" },
    { key: "/dashboard/settings", icon: <Settings className="h-5 w-5" />, label: "Settings", path: "/dashboard/settings" },
    { key: "/dashboard/update-profile", icon: <UsersIcon className="h-5 w-5" />, label: "Profile", path: "/dashboard/update-profile" },
  ];

  const userMenuItems = [
    { key: "/dashboard", icon: <LayoutDashboard className="h-5 w-5" />, label: "Overview", path: "/dashboard" },
    { key: "/dashboard/order-history", icon: <FileText className="h-5 w-5" />, label: "Order History", path: "/dashboard/order-history" },
    { key: "/dashboard/wishlist", icon: <Heart className="h-5 w-5" />, label: "Wishlist", path: "/dashboard/wishlist" },
    { key: "/dashboard/payment-methods", icon: <CreditCard className="h-5 w-5" />, label: "Payment Methods", path: "/dashboard/payment-methods" },
    { key: "/dashboard/settings", icon: <Settings className="h-5 w-5" />, label: "Settings", path: "/dashboard/settings" },
    { key: "/dashboard/update-profile", icon: <UsersIcon className="h-5 w-5" />, label: "Profile", path: "/dashboard/update-profile" },
  ];

  const menuItems = user?.role === "user" ? userMenuItems : adminMenuItems;

  return (
    <Layout className="h-screen overflow-hidden">
      {/* Sidebar with 100vh height */}
      <Sider
        theme="light"
        className="border-r border-gray-200 h-screen overflow-auto"
        width={250}
        style={{ background: "#fff" }}
      >
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

      {/* Content Section - min-h-screen + overflow auto for scrolling */}
      <Layout className="h-screen">
        <Content className="p-6 overflow-auto bg-gray-50" style={{ minHeight: "100vh" }}>
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/update-profile" element={<ProfilePage />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/products" element={<Products />} />
            <Route path="/users" element={<Users />} />
            <Route path="/order-history" element={<OrderHistory />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/payment-methods" element={<PaymentMethods />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
