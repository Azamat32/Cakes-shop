import "./DashboardRegister.scss";
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAdmin } from "../../store/reducers/authReducer";

type Props = {};

const DashboardRegister = (_props: Props) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(""); // New state variable to store the error message
  const dispatch = useDispatch();

  const handleRegister = () => {
    setIsLoading(true);
    setError(""); // Clear any previous error message before making the request
    axios
      .post("http://localhost:5000/api/user/admin", {
        username,
        password,
      })
      .then((response) => {
        dispatch(setAdmin());
        const token = response.data.token;
        localStorage.setItem("tokenAdmin", token);

        setIsLoading(false);
        navigate("/admin_dashboard");
      })
      .catch(() => {
        setError("Invalid username or password"); // Set the error message based on the response
        setIsLoading(false);
      });
  };

  return (
    <div className="Dashboard_register">
      <div className="container">
        <div className="register_inner">
          {error && <p className="error-message">{error}*</p>}

          <input
            type="text"
            placeholder="Логин"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" onClick={handleRegister}>
            Войти
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardRegister;
