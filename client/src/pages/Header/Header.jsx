import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { FavoriteContext } from "../../context/FavoriteContext.jsx";
import { Context } from "../../index.js";

import {
  NEWS_ROUTE,
  DELIVERY_PAYMENT_ROUTE,
  LOGIN_ROUTE,
  CART_PAGE_ROUTE,
  ABOUT_ROUTE,
  CONTACT_ROUTE,
  FAVORITE_PAGE_ROUTE,
  HOME_ROUTE,
  MANAGE_PRODUCTS_ROUTE,
} from "../../utils/consts";
import { observer } from "mobx-react-lite";
import Nav from "react-bootstrap/Nav";
import "./header.scss";

import Search from "../../components/Search/Search.jsx";

const exitIcon = "/images/icon-exit.png";
const loginIcon = "/images/icon-login.png";
const adminIcon = "/images/icon-admin.png";
const cartIcon = "/images/icon-cart.png";
const favoriteIcon = "/images/icon-heart.png";

const Header = observer(({ openFavorite }) => {
  const { cartItems } = useContext(CartContext);
  const { favoriteItems } = useContext(FavoriteContext);
  const { user } = useContext(Context);
  const navigate = useNavigate();
  const isAdmin = user.user?.role === "ADMIN";


  const logOut = () => {
    user.setUser({});
    user.setIsAuth(false);
    localStorage.removeItem("token");
  };

  const cartItemCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  return (
    <header className="header">
      <div className="header__top">
        <p> +38(099)195-00-00 | Працюємо 7 днів на тиждень | 9:00-18:00 </p>
      </div>

      <div className="header__bottom">
        <div className="header__logo">
          <h1 className="bookstore-title">
            <NavLink to="/" className="bookstore-title-link">
              Librix
            </NavLink>
          </h1>
        </div>

        <Search />

        <nav className="navigation">
          <NavLink to={ABOUT_ROUTE} className="nav__link">
            Про нас
          </NavLink>
          <NavLink to={DELIVERY_PAYMENT_ROUTE} className="nav__link">
            Доставка і оплата
          </NavLink>
          <NavLink to={NEWS_ROUTE} className="nav__link">
            Новини
          </NavLink>
          <NavLink to={CONTACT_ROUTE} className="nav__link">
            Контакти
          </NavLink>

{!isAdmin && (
  <>
    {!user.isAuth ? (
      <button className="cart-link" onClick={openFavorite}>
        <div className="cart-btn">
          <img src={favoriteIcon} alt="" />
          {favoriteItems.length > 0 && (
            <span className="cart-badge">{favoriteItems.length}</span>
          )}
        </div>
      </button>
    ) : (
      <NavLink to={FAVORITE_PAGE_ROUTE} className="cart-link">
        <div className="cart-btn">
          <img src={favoriteIcon} alt="" />
          {favoriteItems.length > 0 && (
            <span className="cart-badge">{favoriteItems.length}</span>
          )}
        </div>
      </NavLink>
    )}

    <NavLink to={CART_PAGE_ROUTE} className="cart-link">
      <div className="cart-btn">
        <img src={cartIcon} alt="" />
        {cartItemCount > 0 && (
          <span className="cart-badge">{cartItemCount}</span>
        )}
      </div>
    </NavLink>
  </>
)}

          {user.isAuth ? (
            <Nav className="ml-auto">
              {user.user?.role === "ADMIN" && (
                <NavLink to={MANAGE_PRODUCTS_ROUTE} className="exit-btn">
                  <img src={adminIcon} alt="" />
                  Адмін панель
                </NavLink>
              )}

              <NavLink to={HOME_ROUTE} onClick={logOut} className="exit-btn">
                <img src={exitIcon} alt="" />
                Вихід
              </NavLink>
            </Nav>
          ) : (
            <Nav className="ml-auto">
              <NavLink
                to={LOGIN_ROUTE}
                onClick={() => navigate(LOGIN_ROUTE)}
                className="login-btn"
              >
                <img src={loginIcon} alt="" />
                Увійти
              </NavLink>
            </Nav>
          )}
        </nav>
      </div>
    </header>
  );
});

export default Header;
