import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "../../context/AuthContext";
import Profile from "../../pages/Profile";
import Login from "../../components/Auth/Login";
import Users from "../../components/Admin/Users";
// import Products from "./components/Admin/Products";
import RequireAuth from "../../components/Auth/RequireAuth";
import ProductDetails from "../../pages/ProductDetails/ProductDetails"; 

// import "./App.module.scss";
import "./App.css";
import Header from "../../pages/Header/Header";
import Footer from "../../pages/Footer/Footer";
import Home from "../../pages/Home";
import About from "../../pages/About";
import Contact from "../../pages/Contact";
import PageNotFound from "../../pages/PageNotFound";
import AdminPanel from "../../components/Admin/AdminPanel";

// import Login from "../../pages/Login";
import AddProduct from "../AddProduct/AddProduct";
import CartPage from "../../pages/CartPage";
import { CartProvider } from "../../context/CartContext";

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <div className="app">
          <Header />
          <div className="all_container">
            <div className="container">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/product/:id" element={<ProductDetails />} /> {/* Новый маршрут */}
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/admin-panel" element={<AdminPanel />} />
                <Route path="/login" element={<Login />} />
                <Route path="/add-product" element={<AddProduct />} />
                <Route path="/cart" element={<CartPage />} />
                <Route
                  path="/profile"
                  element={
                    <RequireAuth allowedRoles={["user", "admin"]}>
                      <Profile />
                    </RequireAuth>
                  }
                />
                <Route
                  path="/admin"
                  element={
                    <RequireAuth allowedRoles={["admin"]}>
                      <AdminPanel />
                    </RequireAuth>
                  }
                />
                <Route
                  path="/admin/users"
                  element={
                    <RequireAuth allowedRoles={["admin"]}>
                      <Users />
                    </RequireAuth>
                  }
                />
                <Route
                  path="/admin/products"
                  element={
                    <RequireAuth allowedRoles={["admin"]}>
                      <AddProduct />
                    </RequireAuth>
                  }
                />
                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </div>
          </div>

          <Footer />
        </div>
      </CartProvider>
    </AuthProvider>
  );
}
