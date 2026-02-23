import React, { useContext, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
  HOME_ROUTE,
} from "../../utils/consts";
import { login, registration } from "../../http/userAPI";
import { observer } from "mobx-react-lite";
import { Context } from "../../index";
import { validateAuth } from "../../utils/authValidation";
import "./auth.scss";

const booksSocial = "/images/Books-social.jpg";

const Auth = observer(() => {
  const { user } = useContext(Context);
  const location = useLocation();
  const navigate = useNavigate();
  const isLogin = location.pathname === LOGIN_ROUTE;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [errors, setErrors] = useState({});

  const click = async (e) => {
    e.preventDefault();

    const validationErrors = validateAuth({
      email,
      password,
      repeatPassword,
      agree,
      isLogin,
    });

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      let data;
      if (isLogin) {
        data = await login(email, password);
      } else {
        data = await registration(email, password);
      }

      user.setUser(data);
      user.setIsAuth(true);
      navigate(HOME_ROUTE);
    } catch (e) {
      const message =
        e.response?.data?.message || e.message || "Щось пішло не так";
      setErrors({ server: message });
    }
  };

  return (
    <div className="auth-page">
      <div className="card-books">
        <img src={booksSocial} alt="books" />
      </div>

      <div className="auth">
        <div className="auth__tabs">
          
          <NavLink to={LOGIN_ROUTE} className={isLogin ? "active" : ""}>
            Вхід
          </NavLink>

          <NavLink
            to={REGISTRATION_ROUTE}
            className={!isLogin ? "active" : ""}
          >
            Реєстрація
          </NavLink>
        </div>

        <form className="auth__form" onSubmit={click}>
          <input
            type="email"
            placeholder="e-mail"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrors((prev) => ({ ...prev, email: null, server: null }));
            }}
          />
          {errors.email && (
            <div className="auth__error">{errors.email}</div>
          )}

          <input
            type="password"
            placeholder="Введіть пароль"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setErrors((prev) => ({ ...prev, password: null, server: null }));
            }}
          />
          {errors.password && (
            <div className="auth__error">{errors.password}</div>
          )}

          {!isLogin && (
            <>
              <input
                type="password"
                placeholder="Повторіть пароль"
                value={repeatPassword}
                onChange={(e) => {
                  setRepeatPassword(e.target.value);
                  setErrors((prev) => ({
                    ...prev,
                    repeatPassword: null,
                  }));
                }}
              />
              {errors.repeatPassword && (
                <div className="auth__error">
                  {errors.repeatPassword}
                </div>
              )}

              <label className="auth__checkbox">
                <input
                  type="checkbox"
                  checked={agree}
                  onChange={(e) => {
                    setAgree(e.target.checked);
                    setErrors((prev) => ({ ...prev, agree: null }));
                  }}
                />
                <span>
                  Я погоджуюсь на обробку персональних даних
                </span>
              </label>

              {errors.agree && (
                <div className="auth__error">{errors.agree}</div>
              )}
            </>
          )}

          <button type="submit">
            {isLogin ? "Увійти" : "Зареєструватися"}
          </button>

          {errors.server && (
            <div className="auth__error">{errors.server}</div>
          )}
        </form>
      </div>
    </div>
  );
});

export default Auth;
