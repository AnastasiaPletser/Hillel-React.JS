import Logo from "../../pages/AdminOffice/Logo/Logo";
import "../SideBar/sideBar.css";
// import navList from "./data/navItem.js";
// import NavItem from "./NavItem.jsx";

const SideBar = () => {
  // const [isOpen, setIsOpen] = useState(false);

  // const toggleSidebar = () => {
  //   setIsOpen(!isOpen);
  // };

  return (
    <>
    
      {/* Кнопка бургер-меню */}
      {/* <button 
        className="sidebar-toggle-btn" 
        onClick={toggleSidebar}
      >
        ☰
      </button> */}


      <aside id="sidebar" className="sidebar">
        <Logo />
        <ul className="sidebar-nav">
          <li className="nav-item">
            <a href="/" className="nav-link">
              <i className="bi bi-house"></i>
              Home
            </a>
          </li>
          <li className="nav-item">
            <a href="/products" className="nav-link">
              <i className="bi bi-box"></i>
              Products
            </a>
          </li>
          <li className="nav-item">
            <a href="/settings" className="nav-link">
              <i className="bi bi-gear"></i>
              Settings
            </a>
          </li>
        </ul>
      </aside>
    </>
  );
};

export default SideBar;

