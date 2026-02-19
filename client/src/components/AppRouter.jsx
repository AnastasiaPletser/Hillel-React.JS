import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { publicRoutes, adminRoutes, authRoutes } from "../routes";
import { HOME_ROUTE } from "../utils/consts";
import { Context } from "../index";
import { observer } from "mobx-react-lite";

const AppRouter = observer(() => {
  const { user } = useContext(Context);

  return (
    <div className="wrapper">
      <Routes>
        {user.isAdmin &&
          adminRoutes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        {user.isAuth &&
          authRoutes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}

        {publicRoutes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}

        <Route path="*" element={<Navigate to={HOME_ROUTE} replace />} />
      </Routes>
    </div>
  );
});

export default AppRouter;
