import React from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" />;
  }

  try {
    const decodedToken = jwtDecode(token);
    if (!allowedRoles.includes(decodedToken.role)) {
      return <Navigate to="/" />;
    }
  } catch (error) {
    console.error("Invalid token", error);
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
