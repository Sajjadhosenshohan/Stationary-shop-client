import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Cart from "../pages/Cart";
import Dashboard from "../pages/Dashboard";
import ProductDetails from "../pages/ProductDetails";
import { PaymentFailed } from "../pages/payment/PaymentFailed";
import AllProducts from "../pages/AllProducts";
import About from "../pages/About";
import Register from "../pages/Register";
import NotFound from "../pages/NotFound";
import PaymentSuccess from "../pages/payment/PaymentSuccess";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
        { path: "products", element: <AllProducts /> },
        { path: "products/:id", element: <ProductDetails /> },
        { path: "/payment-successful/:transactionId", element: <PaymentSuccess /> },
        { path: "/payment-failed/:transactionId", element: <PaymentFailed /> },
        { path: "about", element: <About /> },
      { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        {
          path: "cart",
          element: (
            // <PrivateRoute>
              <Cart />
            // </PrivateRoute>
          ),
        },
        {
          path: "dashboard/*",
          element: (
            // <PrivateRoute>
              <Dashboard />
            // </PrivateRoute>
          ),
        },
        { path: "*", element: <NotFound /> },
    ],
  },
]);
