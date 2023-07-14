import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserPage from "../pages/UserPage/UserPage";

export const PublicRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/user" element={<UserPage />} />
      </Routes>
    </BrowserRouter>
  );
};
