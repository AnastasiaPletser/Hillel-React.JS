import React from "react";
import { Link } from "react-router-dom";

const AdminPanel = () => {
  return (
    <div>
      <h2>Адмін-панель</h2>
      <ul>
        <li><Link to="/admin/users">Управління користувачами</Link></li>
        <li><Link to="/admin/products">Управління товарами</Link></li>
      </ul>
    </div>
  );
};

export default AdminPanel;
