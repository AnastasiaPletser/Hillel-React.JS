import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Context } from "../index.js";
import { check } from "../http/userAPI.js";
import { Spinner } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import AppRouter from "../components/AppRouter.jsx";
import { CartProvider } from "../context/CartContext.jsx";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

import "../App/App.css";
import BackToTop from "../components/BackToTop/BackToTop.jsx";
import Footer from "../pages/Footer/Footer.jsx";

const App = observer(() => {
  const { user } = useContext(Context);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    check()
      .then((data) => {
        if (data) {
          user.setUser(data);
          user.setIsAuth(true);
        }
      })
      .catch((error) => {
        console.error("Ошибка авторизации:", error);
        localStorage.removeItem("token");
      })
      .finally(() => setLoading(false));
  }, [user]);

  if (loading) {
    return (
      <div className="spinner-container">
        <Spinner animation="grow" />
      </div>
    );
  }

  return (
    <CartProvider>
      <BrowserRouter>
        <div className="app">
          <AppRouter />
          <BackToTop />
          <Footer />
        </div>
      </BrowserRouter>
    </CartProvider>
  );
});

export default App;
