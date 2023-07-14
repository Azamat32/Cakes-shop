import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "../pages/MainPage/MainPage";

export const PublicRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<MainPage />} />
      </Routes>
    </BrowserRouter>
  );
};
