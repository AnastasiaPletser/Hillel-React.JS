import React from "react";

import { Route, Routes } from "react-router-dom";
import Home from "../../pages/Home";
import About from "../../pages/About";
import Contact from "../../pages/Contact";
import PageNotFound from "../../pages/PageNotFound";

// import Product from "../Product";
import "../../components/App/App.css";
import Admin from "../../pages/Admin";
import Login from "../../pages/Login";
import AddProduct from "../AddProduct/AddProduct";
// import AddProductForm from "../AddProduct/AddProductForm";
// import Layout from "../../components/Layout"
// import Header from "../../pages/Header/Header"

export default function AppRoutes() {
  return (
    <Routes>
      {/* <Route path="/" element={<Layout />}> */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/admin" element={<Admin />} />
      {/* </Route> */}

      <Route path="/login" element={<Login />} />
      {/* <Route path="/add-product" element={<AddProductForm />} /> */}
      <Route path="/add-product" element={<AddProduct />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}
