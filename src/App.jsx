import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "./pages/Home/Home";
import ProductDetail from "./pages/product/ProductDetail";
import Wishlist from "./pages/Wishlist/wishlist";
import Cart from "./pages/Cart/Cart";
import Order from "./pages/order/order";
import MyOrders from "./pages/Myorder/myorder";
import Profile from "./pages/profile/Profile";
import About from "./pages/About/About";
import AllProduct from "./pages/AllProduct/allProduct";
import CareerPage from "./pages/career/Career";
import PrivacyPolicy from "./pages/PrivacyPolicy/privacy";
import TermsAndConditions from "./pages/terms$ conditions/Terms";
import ContactUs from "./pages/contactus/contact";
import SupportCenter from "./pages/support/Support";
import ScrollToTop from "./pages/scrolltop";
import Layout from "./Layout/layout"; 
import Pagenotfound from "./pagenotfound";

import ChangePassword from "./pages/changePassword/changepassword";

const App = () => {
  return (
    <>
      <ToastContainer />
       <ScrollToTop/>
      <Routes>
       
       
        <Route path ="*" element={<Pagenotfound/>}/>
         
      
        <Route element={<Layout />}>
          <Route path="/changepassword" element={<ChangePassword/>}/>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/placeorder" element={<Order />} />
          <Route path="/myorder" element={<MyOrders />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/about" element={<About />} />
          <Route path="/product" element={<AllProduct />} />
          <Route path="/career" element={<CareerPage />} />
          <Route path="/privacypolicy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsAndConditions />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/support" element={<SupportCenter />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
