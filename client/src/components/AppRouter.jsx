import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { publicRoutes, adminRoutes } from "../routes";
import { HOME_ROUTE } from "../utils/consts";
import Header from "../pages/Header/Header";
import { Context } from "../index";
import { observer } from "mobx-react-lite";

const AppRouter = observer(() => {
  const { user } = useContext(Context);
  return (
    <div className="wrapper">
      <Header />
      <div className="wrapper-router">
        <Routes>
          {user.isAdmin &&
            user.isAuth &&
            adminRoutes.map(({ path, Component }) => (
              <Route key={path} path={path} element={<Component />} />
            ))}
          {publicRoutes.map(({ path, Component }) => (
            <Route key={path} path={path} element={<Component />} />
          ))}
          <Route path="*" element={<Navigate to={HOME_ROUTE} replace />} />
        </Routes>
      </div>
    </div>
  );
});

export default AppRouter;
