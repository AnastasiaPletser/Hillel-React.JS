import { NavLink, Outlet } from "react-router-dom";
import Footer from "../pages/Footer/Footer";

const Layout = () => {
  return (
    <div>
      <nav className="navigation">
        <NavLink to="/" end> Головна </NavLink>
        <NavLink to="/about">Про нас</NavLink>
        <NavLink to="/login">Логін</NavLink>
        <NavLink to="/contact">Контакти</NavLink>
        <NavLink to="/add-product">Додати товар</NavLink>

        <NavLink to="/admin">Admin</NavLink>
      </nav>

      <main className="main-content">
        <aside className="aside">Some information</aside>
      <Outlet/>
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
