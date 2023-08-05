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
      const unmaskedPhone = "+" + phone.replace(/\D/g, "");

      // Make an API request to the login_phone endpoint on the backend
      await axios.post("http://localhost:5000/api/user/login_phone", {
        phone_number: unmaskedPhone,

        role: "user",
      });

      // If the verification code is sent successfully, update the state to show the verification code input
      setVerificationCodeSent(true);
    } catch (error) {
      setError("Error sending verification code");
    }
  };

  const handleVerifyVerificationCode = async () => {
    try {
      const unmaskedPhone = "+" + phone.replace(/\D/g, "");

      // Make an API request to the login_verification endpoint on the backend
      const response = await axios.post(
        "http://localhost:5000/api/user/login_verification",
        {
          phone_number: unmaskedPhone,
          verification_code: verificationCode,
        }
      );

      // If verification is successful, you can handle the response here (e.g., show a success message)
      const token = response.data.token; // Assuming the token is received from the server's response
      localStorage.setItem("authToken", token);
      const decodedToken = jwtDecode<any>(token); // The 'any' type here is used to allow any payload data

      // Assuming the token contains the user data in its payload
      const userData = {
        id: decodedToken.userId,
        username: decodedToken.username,
        phone: decodedToken.phone,
        role: decodedToken.role,
      };

      dispatch(setLoggedIn(userData));
    } catch (error) {
      setError("Error verifying verification code");
    }
  };
  const formatPhoneNumber = (value: string) => {
    const phoneNumber = value.replace(/\D/g, "").substring(0, 11);
    const firstThree = phoneNumber.substring(1, 4);
    const secondThree = phoneNumber.substring(4, 7);
    const lastFour = phoneNumber.substring(7, 11);

    return `+7 (${firstThree}) ${secondThree} ${lastFour}`;
  };
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatPhoneNumber(e.target.value);
    setPhone(formattedValue);
  };

  return (
    <div className="login-form">
      <h2>Логин</h2>
      {error && <div className="error-message">{error}</div>}
      {!verificationCodeSent ? (
        <div className="login-form_input">
          <input
            type="text"
            placeholder="+7 (___) ___ __ __"
            value={phone}
            onChange={handlePhoneChange}
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
