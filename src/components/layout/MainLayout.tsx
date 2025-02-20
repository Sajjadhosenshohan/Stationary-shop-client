import React from "react";
import { Layout as AntLayout } from "antd";
import { Outlet } from "react-router-dom";
import Navbar from "../common/Navbar";
import Footer from "../common/Footer";
// import Navbar from "./Navbar";
// import Footer from "./Footer";

const { Content } = AntLayout;

const MainLayout: React.FC = () => {
  return (
    <AntLayout className="min-h-screen flex flex-col">
      <Navbar />
      <Content className="flex-grow">
        <Outlet />
      </Content>
      <Footer />
    </AntLayout>
  );
};

export default MainLayout;
