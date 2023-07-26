import  { useState } from "react";

type LoginFormProps = {
  onLogin: (phone: string) => void;
};

const DashboardLog = (props: LoginFormProps) => {
  const [phone, setPhone] = useState("");
  const { onLogin } = props;
  const handleLogin = () => {
    onLogin(phone);
  };

  return (
    <div className="login-form">
      <h2>Логин</h2>
      <input
        type="text"
        placeholder="Номер телефона"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <button onClick={handleLogin}>Войти</button>
    </div>
  );
};

export default DashboardLog;
