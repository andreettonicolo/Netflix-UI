import React, { Children } from "react";
import { auth } from "../firebase";
import { UserAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ children }) => {
  const { user } = UserAuth();

  if (!user) {
    return <Navigate to="/" />;
  } else {
    return children;
  }
};

export default ProtectedRoutes;
