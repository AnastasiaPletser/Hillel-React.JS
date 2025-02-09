import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const RequireAuth = ({ children, allowedRoles }) => {
  const { user } = useContext(AuthContext);

  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default RequireAuth;
