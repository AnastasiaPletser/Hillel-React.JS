import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Context } from "../index.js";
import { check } from "../http/userAPI.js";
import { Spinner } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";

import AppRouter from "../components/AppRouter.jsx";
import { CartProvider } from "../context/CartContext.jsx";
import { FavoriteProvider } from "../context/FavoriteContext.jsx";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

import "../App/App.css";

import BackToTop from "../components/BackToTop/BackToTop.jsx";
import Footer from "../pages/Footer/Footer.jsx";
import ScrollToTop from "../components/ScrollToTop.jsx";
import Layout from "../components/Layout.jsx";

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
      .catch(() => {
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
      <FavoriteProvider>
        <BrowserRouter>
          <Layout>
            <ScrollToTop />
            <div className="app">
              <div className="wrapper-router">
                <AppRouter />
              </div>
              <BackToTop />
              <Footer />
            </div>
          </Layout>
        </BrowserRouter>
      </FavoriteProvider>
    </CartProvider>
  );
});

export default App;
