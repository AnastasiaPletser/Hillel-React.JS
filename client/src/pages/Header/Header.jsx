import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { Context } from "../../index.js";
import {
  ADMIN_ROUTE,
  LOGIN_ROUTE,
  CART_PAGE_ROUTE,
  ABOUT_ROUTE,
  CONTACT_ROUTE,
  ADD_PRODUCT_ROUTE,
} from "../../utils/consts";
import { observer } from "mobx-react-lite";
import Nav from "react-bootstrap/Nav";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Header = observer(() => {
  const { cartItems } = useContext(CartContext);
  const { user } = useContext(Context);
  const navigate = useNavigate();

  const logOut = () => {
    try {
      user.setUser({});
      user.setIsAuth(false);
      localStorage.removeItem("token");
      console.log("User logged out successfully");
    } catch (error) {
      console.error("Error during logout:", error);
      alert("Виникла помилка при виході з облікового запису.");
    }
  };

  const cartItemCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <header style={styles.header}>
      <div style={styles.logo}>
      <h1 className="bookstore-title">Librix</h1>
      </div>
      <nav className="navigation">
        
        <NavLink to="/" end style={styles.link}>
          Головна
        </NavLink>
        <NavLink to={ABOUT_ROUTE} style={styles.link}>
          Про нас
        </NavLink>
        <NavLink to={CONTACT_ROUTE} style={styles.link}>
          Контакти
        </NavLink>

        <NavLink to={CART_PAGE_ROUTE} style={styles.link}>
          {" "}
          Кошик{" "}
          {cartItemCount > 0 && (
            <span style={styles.badge}>{cartItemCount}</span>
          )}
        </NavLink>

{user.isAuth ? (
  <Nav className="ml-auto" style={{ color: "white" }}>
    {user.user?.role === "ADMIN" && (
      <>
        <Button
          variant={"outline-light"}
          onClick={() => navigate(ADD_PRODUCT_ROUTE)}
          className="mr-2"
        >
          Додати товар 1
        </Button>
        <Button
          variant={"outline-light"}
          onClick={() => navigate(ADMIN_ROUTE)}
          className="mr-2"
        >
          Адмін панель
        </Button>
      </>
    )}

    <Button variant={"outline-light"} onClick={logOut} className="ml-2">
      Вийти
    </Button>
  </Nav>
) : (
  <Nav className="ml-auto" style={{ color: "white" }}>
    <Button
      variant={"outline-light"}
      onClick={() => navigate(LOGIN_ROUTE)}
    >
      Авторизація
    </Button>
  </Nav>
)}

      </nav>
    </header>
  );
});


const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    backgroundColor: "#282c34",
    color: "white",
  },
  logo: {
    fontSize: "1.5rem",
    fontWeight: "bold",
  },
  nav: {
    display: "flex",
    gap: "15px",
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontSize: "1.1rem",
  },
};
export default Header;
