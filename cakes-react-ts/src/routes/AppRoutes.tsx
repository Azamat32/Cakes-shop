import { useState, useEffect } from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import MainPage from "../pages/MainPage/MainPage";
import UserPage from "../pages/UserPage/UserPage";
import BuyPage from "../pages/BuyPage/BuyPage";
import DashboardPage from "../pages/DashboardPage/DashboardPage";
import {PrivateRoutes ,PrivateRoutes2 } from "./PrivateRoutes";
import Navbar from "../widgets/Navbar/Navbar";
import NotFound from "../pages/NotFoundPage/NotFound";
import AboutPage from "../pages/AboutPage/AboutPage";
import ContactPage from "../pages/ContactPage/ContactPage";
import Loader from "../widgets/Loader/Loader";
import Footer from "../widgets/Footer/Footer";
import DashboardRegister from "../pages/DashboardRegister/DashboardRegister";


export const AppRoutes: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // Simulate an asynchronous data fetching or any other async operation
    setTimeout(() => {
      setIsLoading(false); // Set isLoading to false when the data is fetched
    }, 2000); // Simulating a 2-second delay, replace with your actual loading logic
  }, []);

  const location = useLocation();

  if (isLoading) {
    return <Loader />;
  }

  // Check if the current location is the DashboardPage
  const isDashboardPage = location.pathname === "/admin_dashboard";

  return (
    <>
      {isDashboardPage ? null : <Navbar />}
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/order" element={<BuyPage />} />
        <Route path="/dashboard_register" element={<DashboardRegister />} />

        <Route element={<PrivateRoutes />}>
          <Route path="/user" element={<UserPage />} />
        </Route>
      
        <Route element={<PrivateRoutes2 />}>
          <Route path="/admin_dashboard" element={<DashboardPage />} />
        </Route>
      
        <Route path="*" element={<NotFound />} />
      </Routes>
      {isDashboardPage ? null : <Footer />}
    </>
  );
};


