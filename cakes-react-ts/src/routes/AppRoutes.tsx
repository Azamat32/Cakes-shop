import { Route, Routes, Navigate } from "react-router-dom";
import MainPage from "../pages/MainPage/MainPage";
import UserPage from "../pages/UserPage/UserPage";

export const AppRoutes = () => {
  const isAuthenticated = true; // Replace with your authentication logic

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      {isAuthenticated && <Route path="/user" element={<UserPage />} />}
    </Routes>
  );
};
