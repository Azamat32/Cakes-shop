import { AppRoutes } from "./routes/AppRoutes";
import { BrowserRouter } from "react-router-dom";
import { setLoggedIn } from "./store/reducers/authReducer";
import { useDispatch } from "react-redux";
import jwtDecode from "jwt-decode";
import { useEffect } from "react";
import { setAdmin } from "./store/reducers/authReducer";

import "./App.css";
function App() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("authToken");
  const tokenAdmin = localStorage.getItem("tokenAdmin");

  useEffect(() => {
    if (token) {
      try {
        // Decode the token to get the user data
        const decodedToken = jwtDecode<any>(token); // The 'any' type here is used to allow any payload data

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
        dispatch(setAdmin());
      } catch (e) {
        console.log(e);
      }
    }
  }, [dispatch, token]);

  return (
    <>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </>
  );
}

export default App;
