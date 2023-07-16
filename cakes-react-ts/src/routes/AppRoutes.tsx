import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import MainPage from "../pages/MainPage/MainPage";
import UserPage from "../pages/UserPage/UserPage";
import Navbar from "../widgets/Navbar/Navbar";
import NotFound from "../pages/NotFoundPage/NotFound";
export const AppRoutes = () => {
  const isAuthenticated = true; // Replace with your authentication logic

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        {isAuthenticated && <Route path="/user" element={<UserPage />} />}
        <Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  );
};
