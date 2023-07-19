import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import MainPage from "../pages/MainPage/MainPage";
import UserPage from "../pages/UserPage/UserPage";
import Navbar from "../widgets/Navbar/Navbar";
import NotFound from "../pages/NotFoundPage/NotFound";
import AboutPage from "../pages/AboutPage/AboutPage";
import ContactPage from "../pages/ContactPage/ContactPage";
import Loader from "../widgets/Loader/Loader"
import Footer from "../widgets/Footer/Footer"
export const AppRoutes: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const isAuthenticated = true; // Replace with your authentication logic

  useEffect(() => {
    // Simulate an asynchronous data fetching or any other async operation
    setTimeout(() => {
      setIsLoading(false); // Set isLoading to false when the data is fetched
    }, 2000); // Simulating a 2-second delay, replace with your actual loading logic
  }, []);

  if (isLoading) {
    return (
      <Loader />
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />

        {isAuthenticated && <Route path="/user" element={<UserPage />} />}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};
