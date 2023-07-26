import React, { useState } from "react";
import DashboardLog from "./DashboardLog";
import DashboardReg from "./DashboardReg";
import "./UnloggedDashboard.scss";

const UnloggedDashboard: React.FC = () => {
  const [showRegistration, setShowRegistration] = useState(true);

  const handleTabChange = (isRegistrationTab: boolean) => {
    setShowRegistration(isRegistrationTab);
  };

  const handleRegister = (userData: { nickname: string; phone: string }) => {
    // Perform registration logic (e.g., API calls)
    console.log("Registration Data:", userData);
  };

  const handleLogin = (phone: string) => {
    // Perform login logic (e.g., API calls)
    console.log("Phone:", phone);
  };

  return (
    <div className="unlogged-dashboard">
      <div className="unlogged-dashboard_inner">
        <div className="tabs">
          <button
            onClick={() => handleTabChange(true)}
            className={showRegistration ? "active" : ""}
          >
            Регистрация
          </button>
          <button
            onClick={() => handleTabChange(false)}
            className={!showRegistration ? "active" : ""}
          >
            Логин
          </button>
        </div>
        {showRegistration ? (
          <DashboardReg onRegister={handleRegister} />
        ) : (
          <DashboardLog onLogin={handleLogin} />
        )}
      </div>
    </div>
  );
};

export default UnloggedDashboard;
