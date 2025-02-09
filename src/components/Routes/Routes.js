import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../../pages/Home";
import About from "../../pages/About";
import Contact from "../../pages/Contact";
import PageNotFound from "../../pages/PageNotFound";

import "../../components/App/App.css";
import AdminPanel from "../../components/Admin/AdminPanel";
import Login from "../../pages/Login";
import AddProduct from "../AddProduct/AddProduct";
// import AddProductForm from "../AddProduct/AddProductForm";


export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/admin-panel" element={<AdminPanel />} />

      <Route path="/login" element={<Login />} />
      {/* <Route path="/add-product" element={<AddProductForm />} /> */}
      <Route path="/add-product" element={<AddProduct />} />
      <Route path="*" element={<PageNotFound />} />

    </Routes>
  );
}
