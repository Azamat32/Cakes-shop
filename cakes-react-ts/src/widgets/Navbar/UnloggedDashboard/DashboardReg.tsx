import { useState } from "react";
import axios from "axios";
import { useDispatch } from 'react-redux';

import { setRegistered } from '../../../store/reducers/authReducer';
type RegistrationFormProps = {};

const DashboardReg = (_props: RegistrationFormProps) => {
  const dispatch = useDispatch();

  const [nickname, setNickname] = useState("");
  const [phone, setPhone] = useState("");
  const [verificationCodeSent, setVerificationCodeSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [error, setError] = useState(""); // State to store server error message

  const handleSendVerificationCode = async () => {
    try {
      // Make an API request to the registration endpoint on the backend
      const response = await axios.post(
        "http://localhost:5000/api/user/registration_phone",
        {
          phone_number: phone,
          username: nickname,
          role: "user",
        }
      );

      // If the verification code is sent successfully, update the state to show the verification code input
      setVerificationCodeSent(true);

    } catch (error) {
      // Handle errors here, such as displaying an error message to the user
      setError("Error sending verification code");
      console.error(error);
    }
  };

  const handleVerifyVerificationCode = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/registration_verification",
        {
          phone_number: phone,
          verification_code: verificationCode,
        }
      );
      dispatch(setRegistered());

      // If verification is successful, you can handle the response here (e.g., show a success message)
      console.log(response.data);
    } catch (error) {
      // Handle errors here, such as displaying an error message to the user
      setError("Error verifying verification code");
      console.error(error);
    }
  };

  return (
    <div className="registration-form">
      <h2>Регистрация</h2>
      {error && <div className="error-message">{error}</div>}
      {!verificationCodeSent ? (
        <div className="registration-form_input">
          <input
            type="text"
            placeholder="Nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
          <input
            type="text"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <button onClick={handleSendVerificationCode}>Отправить код</button>
        </div>
      ) : (
        <div className="registration-form_input">
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

export default DashboardReg;
