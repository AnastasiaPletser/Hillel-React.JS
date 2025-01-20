import React from "react";
import "./App.css";
import Header from "../../pages/Header/Header";
import Footer from "../../pages/Footer/Footer";

import { Route, Routes } from "react-router-dom";
import Home from "../../pages/Home";
import About from "../../pages/About";
import Contact from "../../pages/Contact";
import PageNotFound from "../../pages/PageNotFound";
import Admin from "../../pages/Admin";
import Login from "../../pages/Login";
import AddProduct from "../AddProduct/AddProduct";
import CartPage from "../../pages/CartPage"; 
import { CartProvider } from "../../context/CartContext";

export default function App() {
  return (
    <CartProvider>
      <div className="app">
        <Header />
        <div className="all_container">
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/login" element={<Login />} />
              <Route path="/add-product" element={<AddProduct />} />
              <Route path="/cart" element={<CartPage />} /> 
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </div>
        </div>
        <Footer />
      </div>
    </CartProvider>
  );
}


