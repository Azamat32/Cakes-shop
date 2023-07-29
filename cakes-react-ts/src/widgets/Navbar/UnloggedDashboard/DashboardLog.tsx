import { useState } from "react";
import axios from "axios";
import { setLoggedIn } from "../../../store/reducers/authReducer";
import { useDispatch } from "react-redux";
import jwtDecode from "jwt-decode";

type LoginFormProps = {};

const DashboardLog = (_props: LoginFormProps) => {
  const dispatch = useDispatch();

  const [phone, setPhone] = useState("");
  const [verificationCodeSent, setVerificationCodeSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [error, setError] = useState(""); // State to store server error message

  const handleSendVerificationCode = async () => {
    try {
      // Make an API request to the login_phone endpoint on the backend
      const response = await axios.post(
        "http://localhost:5000/api/user/login_phone",
        {
          phone_number: phone,
          role: "user",
        }
      );

      // If the verification code is sent successfully, update the state to show the verification code input
      setVerificationCodeSent(true);
    } catch (error) {
      setError("Error sending verification code");
      console.error(error);
    }
  };

  const handleVerifyVerificationCode = async () => {
    try {
      // Make an API request to the login_verification endpoint on the backend
      const response = await axios.post(
        "http://localhost:5000/api/user/login_verification",
        {
          phone_number: phone,
          verification_code: verificationCode,
        }
      );

      // If verification is successful, you can handle the response here (e.g., show a success message)
      const token = response.data.token; // Assuming the token is received from the server's response
      localStorage.setItem("authToken", token);
      const decodedToken = jwtDecode<any>(token); // The 'any' type here is used to allow any payload data
      console.log(decodedToken);

      // Assuming the token contains the user data in its payload
      const userData = {
        id: decodedToken.userId,
        username: decodedToken.username,
        phone: decodedToken.phone,
        role: decodedToken.role,
      };
      console.log(userData);

      dispatch(setLoggedIn(userData));
    } catch (error) {
      setError("Error verifying verification code");
      console.error(error);
    }
  };

  return (
    <div className="login-form">
      <h2>Логин</h2>
      {error && <div className="error-message">{error}</div>}
      {!verificationCodeSent ? (
        <div className="login-form_input">
          <input
            type="text"
            placeholder="Номер телефона"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <button onClick={handleSendVerificationCode}>Отправить код</button>
        </div>
      ) : (
        <div className="login-form_input">
          <input
            type="text"
            placeholder="Verification Code"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
          />
          <button onClick={handleVerifyVerificationCode}>Проверить код</button>
        </div>
      )}
    </div>
  );
};

export default DashboardLog;
