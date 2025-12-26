import React from "react";
import Header from "../Component/Header/Header";
import Footer from "../Component/Footer/Footer";
import { Outlet } from "react-router-dom";
import Navbar from "../Component/Navbar/Navbar";

const Layout = () => {
  return (
    <>
      <Header />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
