import React, { useContext } from 'react';
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../../redux/authSlice";
import { CartContext } from '../../context/CartContext';

const Header = () => {
  const dispatch = useDispatch();
  // const authData = useSelector((state) => state.auth);
  // console.log(authData);
  const { cartItems } = useContext(CartContext);

  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  
  const { isLogin } = useSelector((state) => state.auth);
  const handleLogin = () => {
    dispatch(login());
  };

  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <header style={styles.header}>
       <div style={styles.logo}>
        <NavLink to="/" style={styles.link}>
          <h1>Магазин</h1>
        </NavLink>
      </div>
      <nav className="navigation">
        <NavLink to="/" end>Головна</NavLink>
        <NavLink to="/about">Про нас</NavLink>
        <NavLink to="/login">Логін</NavLink>
        <NavLink to="/contact">Контакти</NavLink>
        <NavLink to="/cart">Корзина ({cartItemCount})</NavLink>
        <NavLink to="/add-product">Додати товар</NavLink>
        <NavLink to="/admin">Admin</NavLink>
        {/* <button onClick={handleLogin}>Login</button>
        <button onClick={handleLogout}>Logout</button> */}
        {isLogin ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <button onClick={handleLogin}>Login</button>
        )}
      </nav>
      </header>
  );
};

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: '#282c34',
    color: 'white',
  },
  logo: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
  },
  nav: {
    display: 'flex',
    gap: '15px',
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '1.1rem',
  },
};
export default Header;
