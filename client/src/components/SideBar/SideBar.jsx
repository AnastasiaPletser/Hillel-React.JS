import { NavLink } from "react-router-dom";
import Logo from "../../pages/AdminOffice/Logo/Logo";
import "../SideBar/sideBar.scss";
import { MANAGE_PRODUCTS_ROUTE, USERS_ROUTE, SETTINGS_ROUTE } from "../../utils/consts";

const SideBar = () => {

  return (
    <>
      <aside id="sidebar" className="sidebar">
        <Logo />
        <ul className="sidebar-nav">
          <li className="nav-item">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              <i className="bi bi-house"></i>
              Головна сторінка
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink
              to={MANAGE_PRODUCTS_ROUTE}
              className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
            >
              <i className="bi bi-box"></i>
              Управління продуктами
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink
              to={USERS_ROUTE}
              className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
            >
              <i className="bi bi-person"></i>
              Користувачі
            </NavLink>
          </li>


          <li className="nav-item">
            <NavLink
              to={SETTINGS_ROUTE}
              className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
            >
              <i className="bi bi-gear"></i>
              Налаштування
            </NavLink>
          </li>

           <li className="nav-item">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              <i className="bi-box-arrow-right"></i>
              Вихід
            </NavLink>
          </li>

        </ul>
      </aside>
    </>
  );
};

export default SideBar;
