import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../../redux/authSlice";

const Header = () => {
  const dispatch = useDispatch();
  // const authData = useSelector((state) => state.auth);
  // console.log(authData);

  const { isLogin } = useSelector((state) => state.auth);
  const handleLogin = () => {
    dispatch(login());
  };

  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <div>
      <nav className="navigation">
        <NavLink to="/" end>Головна</NavLink>
        <NavLink to="/about">Про нас</NavLink>
        <NavLink to="/login">Логін</NavLink>
        <NavLink to="/contact">Контакти</NavLink>
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
    </div>
  );
};

export default Header;
