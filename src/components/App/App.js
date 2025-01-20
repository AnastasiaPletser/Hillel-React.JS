import React from "react";
import "./App.css";
import Header from "../../pages/Header/Header";
import Footer from "../../pages/Footer/Footer";
import AppRoutes from "../Routes/Routes";

export default function App() {
  return (
    <div className="app">
      <Header />
      <div className="all_container">
        <div className="container">
          <AppRoutes />
        </div>
      </div>

      <Footer />
    </div>
  );
}
