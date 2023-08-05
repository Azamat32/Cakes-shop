import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";

import { setRegistered } from "../../../store/reducers/authReducer";
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
      const unmaskedPhone = "+" + phone.replace(/\D/g, "");

      // Make an API request to the registration endpoint on the backend
      await axios.post("http://localhost:5000/api/user/registration_phone", {
        phone_number: unmaskedPhone,

        username: nickname,
        role: "user",
      });

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
      const unmaskedPhone = "+" + phone.replace(/\D/g, "");

      await axios.post(
        "http://localhost:5000/api/user/registration_verification",
        {
          phone_number: unmaskedPhone,
          verification_code: verificationCode,
        }
      );
      dispatch(setRegistered());
    } catch (error) {
      // Handle errors here, such as displaying an error message to the user
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
            placeholder="+7 (___) ___ __ __"

            value={phone}
            onChange={handlePhoneChange}
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
