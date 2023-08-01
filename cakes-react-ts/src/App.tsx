import { AppRoutes } from "./routes/AppRoutes";
import { BrowserRouter } from "react-router-dom";
import { setLoggedIn, setAdmin } from "./store/reducers/authReducer";
import { useDispatch } from "react-redux";
import jwtDecode from "jwt-decode";
import { useEffect } from "react";
import { logoutUser, logoutAdmin } from "./store/reducers/authReducer"; // Add your logout actions here

import "./App.css";
function App() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("authToken");
  const tokenAdmin = localStorage.getItem("tokenAdmin");

  useEffect(() => {
    if (token) {
      try {
        // Decode the token to get the user data and expiration time
        const decodedToken = jwtDecode<any>(token); // The 'any' type here is used to allow any payload data

        // Check if the token has already expired
        const currentTime = Date.now() / 1000; // Get the current time in seconds
        if (decodedToken.exp < currentTime) {
          // Token has expired, clear it from localStorage and log the user out
          localStorage.removeItem("authToken");
          dispatch(logoutUser()); // Dispatch the logout action for the regular user
          return; // Exit the useEffect early
        }

        // Assuming the token contains the user data in its payload
        const userData = {
          id: decodedToken.userId,
          username: decodedToken.username,
          phone: decodedToken.phone,
          role: decodedToken.role,
        };

        dispatch(setLoggedIn(userData)); // Dispatch the action to set the user as logged in
      } catch (error) {
        // If there's an error decoding the token, handle it here
        console.error("Error decoding token:", error);
      }
    }

    if (tokenAdmin) {
      try {
        // Decode the admin token to get the expiration time
        const decodedAdminToken = jwtDecode<any>(tokenAdmin);

        // Check if the admin token has already expired
        const currentTime = Date.now() / 1000;
        if (decodedAdminToken.exp < currentTime) {
          // Admin token has expired, clear it from localStorage and log the admin out
          localStorage.removeItem("tokenAdmin");
          dispatch(logoutAdmin()); // Dispatch the logout action for the admin
          return; // Exit the useEffect early
        }

        dispatch(setAdmin());
      } catch (e) {
        console.log(e);
      }
    }
  }, [dispatch, token, tokenAdmin]);

  return (
    <>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </>
  );
}

export default App;
