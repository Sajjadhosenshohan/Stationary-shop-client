import React, { useState } from "react";
import { Layout, Menu, Button, Avatar, Tag } from "antd";
import {
  Routes,
  Route,
  Navigate,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import { logout, useCurrentUser } from "../../redux/auth/authSlice";
import { useGetProfileDataQuery } from "../../redux/Features/userManagement/userManagement.api";
import {
  ShoppingBag,
  Package,
  LayoutDashboard,
  FileText,
  UsersIcon,
  X,
  House,
  LogOut,
} from "lucide-react";
import { MenuOutlined, UserOutlined } from "@ant-design/icons";
import Orders from "./Orders";
import Products from "./Products";
import OrderHistory from "./OrderHistory";
import Users from "./Users";
import { ProfilePage } from "../profile";
import UserDashboardOverview from "./UserDashboardOverview";
import AdminDashboardOverview from "./AdminDashboardOverview";
import { useDispatch } from "react-redux";
import PrivateRoute from "../../components/common/PrivateRoute";

const { Sider, Content } = Layout;

const Dashboard: React.FC = () => {
  const location = useLocation();
  const user = useAppSelector(useCurrentUser);
  const [collapsed, setCollapsed] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data: res, isFetching } = useGetProfileDataQuery(user?.email);

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
  const image = res?.data?.imageUrl;

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

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
        className={`bg-white border-r border-gray-200 ${
          collapsed ? "hidden" : "block"
        } md:block relative md:relative z-40`}
        width={300}
        style={{ background: "#fff", height: "100vh", overflowY: "auto" }}
      >
        {!collapsed && (
          <div
            className="absolute md:hidden top-14 right-2 z-50 rounded-full p-1 border border-red-500"
            onClick={() => setCollapsed(!collapsed)}
          >
            <X className="text-red-500" />
          </div>
        )}

        <div className="flex flex-col h-full justify-between">
          {/* User Info Section */}
          <div className="p-6 bg-gradient-to-b from-gray-50 to-white shadow-lg rounded-xl">
            <div className="flex flex-col gap-4 justify-center items-center p-4">
              <Avatar
                size={90}
                className="avatar_image ring-4 ring-red-100 transition-transform hover:scale-105 animate-pulse"
                src={image || "https://i.ibb.co.com/NgnypWqH/download.jpg"}
              />
              <div className="text-center">
                <h2 className="text-2xl font-semibold text-gray-900 tracking-tight">
                  {user?.name}
                </h2>
                <h2 className="text-lg text-gray-600 mt-1">{user?.email}</h2>
                <h2 className="text-lg font-medium mt-2">
                  <Tag color="green">
                    Role: {user?.role === "admin" ? "Admin" : "User"}
                  </Tag>
                </h2>
              </div>
            </div>
          </div>

          {/* Menu Section */}
          <div className="flex-grow">
            <Menu
              mode="inline"
              selectedKeys={[location.pathname]}
              items={menuItems.map((item) => ({
                key: item.key,
                icon: item.icon,
                label: <Link to={item.path}>{item.label}</Link>,
              }))}
              className="border-none"
            />
          </div>

          {/* Buttons Section */}
          <div className="p-6 flex flex-col gap-3">
            <Link onClick={handleLogout} to="/login">
              <Button
                className="w-full"
                color="danger"
                size="large"
                icon={<LogOut />}
                variant="outlined"
              >
                Logout
              </Button>
            </Link>

            <Link to="/">
              <Button
                className="w-full"
                color="danger"
                size="large"
                icon={<House />}
                variant="outlined"
              >
                Home
              </Button>
            </Link>
          </div>
        </div>
      </Sider>
      <Layout>
        <Content
          className="p-6 overflow-auto bg-gray-50"
          style={{ minHeight: "100vh" }}
        >
          <Routes>
            {/* Admin Routes */}
            <Route
              path="/admin-dashboard-overview"
              element={
                <PrivateRoute requireAdmin>
                  <AdminDashboardOverview />
                </PrivateRoute>
              }
            />
            <Route
              path="/update-profile"
              element={
                <PrivateRoute>
                  <ProfilePage />
                </PrivateRoute>
              }
            />
            <Route
              path="/orders"
              element={
                <PrivateRoute requireAdmin>
                  <Orders />
                </PrivateRoute>
              }
            />
            <Route
              path="/products"
              element={
                <PrivateRoute requireAdmin>
                  <Products />
                </PrivateRoute>
              }
            />
            <Route path="/users"  element={<PrivateRoute requireAdmin><Users /> </PrivateRoute>} />
            {/* User Routes */}
            <Route
              path="/user-dashboard-overview"
              element={<PrivateRoute><UserDashboardOverview /></PrivateRoute>}
            />
            <Route path="/order-history" element={<PrivateRoute> <OrderHistory /></PrivateRoute>} />
            <Route
              path="*"
              element={
                <Navigate
                  to={`${
                    user?.role === "admin"
                      ? "/dashboard/admin-dashboard-overview"
                      : "/dashboard/user-dashboard-overview"
                  }`}
                  replace
                />
              }
            />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
