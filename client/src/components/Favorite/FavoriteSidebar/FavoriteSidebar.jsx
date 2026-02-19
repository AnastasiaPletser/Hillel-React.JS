import React from "react";
import { Nav } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { LOGIN_ROUTE } from "../../../utils/consts";
import "../FavoriteSidebar/favoriteSidebar.scss"
const loginIcon = "/images/icon-login.png";

const FavoriteSidebar = ({ isOpen, onClose }) =>{

 const navigate = useNavigate();
return (
    <>
     <div
        className={`overlay ${isOpen ? "active" : ""}`}
        onClick={onClose}
      />

    <aside className={`favorite-sidebar ${isOpen ? "open" : ""}`}>
      <button className="close-btn" onClick={onClose}>✕</button>
      
        <p>Увійди або зареєструйся, щоб зберігати товари в обране</p> 
         <Nav className="ml-auto" style={{ color: "white" }}>
            <NavLink
              to="./login"
              onClick={() => navigate(LOGIN_ROUTE)}
              className="login-btn"
            >
              <img src={loginIcon} alt="" />
              Увійти
            </NavLink>
          </Nav>
    </aside>
    </>
)
}
export default FavoriteSidebar;
