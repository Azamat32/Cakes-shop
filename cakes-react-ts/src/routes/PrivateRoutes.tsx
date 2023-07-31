import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { RootState } from "../store/store";
import { useSelector } from "react-redux";
export  const PrivateRoutes: React.FC = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  return isLoggedIn ? <Outlet /> : <Navigate to="/" />;
};

export const PrivateRoutes2: React.FC = () => {
  const isAdminLoggedIn = useSelector((state: RootState) => state.auth.isAdmin);

  return isAdminLoggedIn ? <Outlet /> : <Navigate to="/" />;
};

