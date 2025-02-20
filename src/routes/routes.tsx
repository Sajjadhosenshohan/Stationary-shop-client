import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
    //   { path: "products", element: <Products /> },
    //   { path: "products/:id", element: <ProductDetails /> },
    //   { path: "about", element: <About /> },
    //   { path: "contact", element: <Contact /> },
    //   { path: "login", element: <Login /> },
    //   { path: "register", element: <Register /> },
    //   {
    //     path: "cart",
    //     element: (
    //       <PrivateRoute>
    //         <Cart />
    //       </PrivateRoute>
    //     ),
    //   },
    //   {
    //     path: "dashboard/*",
    //     element: (
    //       <PrivateRoute>
    //         <Dashboard />
    //       </PrivateRoute>
    //     ),
    //   },
    //   { path: "*", element: <NotFound /> },
    ],
  },
]);
