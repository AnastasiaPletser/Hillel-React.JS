import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  const { login } = useContext(AuthContext);

  return (
    <div>
      <h2>Вхід</h2>
      <button onClick={() => login("user")}>Увійти як користувач</button>
      <button onClick={() => login("admin")}>Увійти як адміністратор</button>
    </div>
  );
};

export default Login;
