import React, { useState } from "react";

type RegistrationFormProps = {
  onRegister: (userData: { nickname: string; phone: string }) => void;
};

const DashboardReg = (props: RegistrationFormProps) => {
  const [nickname, setNickname] = useState("");
  const [phone, setPhone] = useState("");
  const { onRegister } = props;
  const handleRegister = () => {
    onRegister({ nickname, phone });
  };

  return (
    <div className="registration-form">
      <h2>Регистрация</h2>
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
        <button onClick={handleRegister}>Регистрация</button>
      </div>
    </div>
  );
};

export default DashboardReg;
