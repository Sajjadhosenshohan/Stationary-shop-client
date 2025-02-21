import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Menu, Dropdown } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { PencilRuler, ShoppingCart, User } from "lucide-react";
import { RootState } from "../../redux/store";
import { useAppSelector } from "../../redux/hooks";
import { logout, useCurrentUser } from "../../redux/auth/authSlice";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useAppSelector(useCurrentUser);
  // const items  = useSelector((state: RootState) => state?.cart?.items);


  const cartItems = useSelector((state: RootState) => state?.cart?.items);
  const [localCart, setLocalCart] = useState(cartItems);

  useEffect(() => {
    setLocalCart(cartItems);
  }, [cartItems]);

  // console.log(localCart,"user from navbar", state);
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const userMenu = (
    <Menu>
      {user ? (
        <>
          <Menu.Item key="dashboard">
            <Link to="/dashboard">Dashboard</Link>
          </Menu.Item>
          <Menu.Item key="logout" onClick={handleLogout}>
            Logout
          </Menu.Item>
        </>
      ) : (
        <>
          <Menu.Item key="login">
            <Link to="/login">Login</Link>
          </Menu.Item>
          <Menu.Item key="register">
            <Link to="/register">Register</Link>
          </Menu.Item>
        </>
      )}
    </Menu>
  );

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <PencilRuler className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">
                StationeryShop
              </span>
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                to="/"
                className="text-gray-900 hover:text-indigo-600 px-3 py-2"
              >
                Home
              </Link>
              <Link
                to="/products"
                className="text-gray-900 hover:text-indigo-600 px-3 py-2"
              >
                Products
              </Link>
              <Link
                to="/about"
                className="text-gray-900 hover:text-indigo-600 px-3 py-2"
              >
                About
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            <Link to="/cart" className="relative p-2">
              <ShoppingCart className="h-6 w-6 text-gray-600" />
              {localCart?.length > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-indigo-600 rounded-full">
                  {localCart?.length}
                </span>
              )}
            </Link>
            <Dropdown overlay={userMenu} placement="bottomRight">
              <Button
                type="text"
                className="flex items-center ml-4"
                icon={<User className="h-5 w-5" />}
              />
            </Dropdown>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
