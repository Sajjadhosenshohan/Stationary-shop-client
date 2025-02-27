import React, { useState } from "react";
import { Link, useNavigate, useLocation, NavLink } from "react-router-dom";
import {
  Button,
  Menu,
  Dropdown,
  Drawer,
  ConfigProvider,
  theme,
  Avatar,
} from "antd";
import { useSelector, useDispatch } from "react-redux";
import {
  LayoutDashboard,
  LogOut,
  PencilRuler,
  ShoppingCart,
  User,
  Menu as MenuIcon,
  Home,
  Info,
  LogIn,
  UserPlus,
  Package,
  Divide,
} from "lucide-react";
import { RootState } from "../../redux/store";
import { useAppSelector } from "../../redux/hooks";
import { logout, useCurrentUser } from "../../redux/auth/authSlice";
import { useGetProfileDataQuery } from "../../redux/Features/userManagement/userManagement.api";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useAppSelector(useCurrentUser);
  const cartItems = useSelector((state: RootState) => state?.cart?.items);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isDashboardRoute = location.pathname.startsWith("/dashboard");

  const { data: res } = useGetProfileDataQuery(user?.email);
  const currentUserInfo = res?.data;

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
    setDrawerOpen(false);
  };

  const roleBaseRoute =
    user?.role === "admin"
      ? "/dashboard/admin-dashboard-overview"
      : "/dashboard/user-dashboard-overview";

  const navigationItems = [
    { key: "/", label: "Home", icon: <Home className="h-5 w-5" /> },
    // {
    //   key: roleBaseRoute,
    //   label: "Dashboard",
    //   icon: <LayoutDashboard className="h-5 w-5" />,
    // },
    {
      key: "/products",
      label: "All Products",
      icon: <Package className="h-5 w-5" />,
    },
    { key: "/about", label: "About Us", icon: <Info className="h-5 w-5" /> },
  ];

  // console.log(currentUserInfo);

  const userMenu = (
    <Menu className="w-48">
      {user ? (
        <>
          <Menu.Item key="profile" icon={<User className="h-4 w-4" />}>
            <Link to="/dashboard/update-profile">Profile</Link>
          </Menu.Item>
          <Menu.Item
            key="dashboard"
            icon={<LayoutDashboard className="h-4 w-4" />}
          >
            <Link to={roleBaseRoute}>Dashboard</Link>
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item
            key="logout"
            icon={<LogOut className="h-4 w-4" />}
            onClick={handleLogout}
            danger
          >
            Logout
          </Menu.Item>
        </>
      ) : (
        <>
          <Menu.Item key="login" icon={<LogIn className="h-4 w-4" />}>
            <Link to="/login">Login</Link>
          </Menu.Item>
          <Menu.Item key="register" icon={<UserPlus className="h-4 w-4" />}>
            <Link to="/register">Register</Link>
          </Menu.Item>
        </>
      )}
    </Menu>
  );

  const drawerContent = (
    <ConfigProvider
      theme={{
        algorithm: theme.defaultAlgorithm,
        token: {
          colorPrimary: "#dc2626",
        },
      }}
    >
      <Menu
        mode="inline"
        selectedKeys={[location.pathname]}
        className="border-none"
      >
        {navigationItems?.map((item) => (
          <Menu.Item
            key={item.key}
            icon={item.icon}
            onClick={() => {
              navigate(item.key);
              setDrawerOpen(false);
            }}
          >
            {item.label}
          </Menu.Item>
        ))}
        <Menu.Divider />
        {user ? (
          <>
            <Menu.Item
              key="profile"
              icon={<User className="h-5 w-5" />}
              onClick={() => {
                navigate("/profile");
                setDrawerOpen(false);
              }}
            >
              Profile
            </Menu.Item>

            <Menu.Item
              key="dashboard"
              icon={<LayoutDashboard className="h-5 w-5" />}
              onClick={() => {
                navigate("/dashboard");
                setDrawerOpen(false);
              }}
            >
              Dashboard
            </Menu.Item>
            <Menu.Item
              key="logout"
              icon={<LogOut className="h-5 w-5" />}
              onClick={handleLogout}
              danger
            >
              Logout
            </Menu.Item>
          </>
        ) : (
          <>
            <Menu.Item
              key="login"
              icon={<LogIn className="h-5 w-5" />}
              onClick={() => {
                navigate("/login");
                setDrawerOpen(false);
              }}
            >
              Login
            </Menu.Item>
            <Menu.Item
              key="register"
              icon={<UserPlus className="h-5 w-5" />}
              onClick={() => {
                navigate("/register");
                setDrawerOpen(false);
              }}
            >
              Register
            </Menu.Item>
          </>
        )}
      </Menu>
    </ConfigProvider>
  );

  return (
    <div className={` ${isDashboardRoute ? "hidden" : "block"} bg-white`}>
      <ConfigProvider
        theme={{
          algorithm: theme.defaultAlgorithm,
          token: {
            colorPrimary: "#dc2626",
          },
        }}
      >
        <nav
          className={`shadow-md fixed w-full top-0 left-0 right-0 bg-white z-50`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Logo */}
              <div className="flex-shrink-0 flex items-center">
                <Link to="/" className="flex items-center h-16 w-20">
                  <img
                    src={"https://i.ibb.co.com/0jSQHFxP/logo.png"}
                    className="w-full h-full"
                  ></img>
                </Link>
              </div>
              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-8">
                {navigationItems.map((item) => (
                  <NavLink
                    key={item.key}
                    to={item.key}
                    className={({ isActive }) =>
                      `px-3 py-2 text-sm font-medium ${
                        isActive ? "text-red-500" : "text-gray-500"
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
              </div>
              {/* Desktop Right Section */}
              <div className="hidden md:flex items-center space-x-4">
                <Link to="/cart" className="relative p-2 hover:text-red-600">
                  <ShoppingCart className="h-6 w-6" />
                  {cartItems?.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                      {cartItems.length}
                    </span>
                  )}
                </Link>

                {user ? (
                  <Dropdown
                    overlay={userMenu}
                    placement="bottomRight"
                    className="cursor-pointer"
                    trigger={["click"]}
                  >
                    {/* <Avatar className="cursor-pointer" size="large" src={user?.imageUrl || <User className="h-6 w-6" />} /> */}
                    <Avatar size="large" src={currentUserInfo?.imageUrl} />
                  </Dropdown>
                ) : (
                  <Link to={"/login"}>
                    <Button color="danger" variant="outlined">
                      Login
                    </Button>
                  </Link>
                )}
              </div>
              {/* Mobile Menu Button */}
              <div className="md:hidden flex items-center space-x-4">
                <Link to="/cart" className="relative p-2">
                  <ShoppingCart className="h-6 w-6" />
                  {cartItems?.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                      {cartItems.length}
                    </span>
                  )}
                </Link>
                <Button
                  type="text"
                  icon={<MenuIcon className="h-6 w-6" />}
                  onClick={() => setDrawerOpen(true)}
                />
              </div>
            </div>
          </div>

          {/* Mobile Drawer */}
          <Drawer
            title={
              <div className="flex items-center space-x-2">
                <PencilRuler className="h-6 w-6 text-red-600" />
                <span className="font-bold text-lg">StationeryShop</span>
              </div>
            }
            placement="left"
            onClose={() => setDrawerOpen(false)}
            open={drawerOpen}
            width={280}
          >
            <div className="grid place-content-center my-10"><Avatar size={50} src={currentUserInfo?.imageUrl} /></div>
            {drawerContent}
          </Drawer>
        </nav>
        {/* Spacer for fixed navbar */}
        <div className="h-16" />
      </ConfigProvider>
    </div>
  );
};

export default Navbar;
