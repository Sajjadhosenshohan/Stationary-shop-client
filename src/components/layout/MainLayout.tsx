import React from "react";
import { Layout as AntLayout, ConfigProvider } from "antd";
import { Outlet } from "react-router-dom";
import Navbar from "../common/Navbar";
import Footer from "../common/Footer";

const { Content } = AntLayout;

const MainLayout: React.FC = () => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#dc2626", // Tailwind's red-600
          colorLink: "#dc2626",
          colorLinkHover: "#b91c1c", // Tailwind's red-700
        },
      }}
    >
      <AntLayout>
        <Navbar />
        <Content>
          <div className="min-h-screen">
            <Outlet />
          </div>
        </Content>
        <Footer />
      </AntLayout>
    </ConfigProvider>
  );
};

export default MainLayout;
