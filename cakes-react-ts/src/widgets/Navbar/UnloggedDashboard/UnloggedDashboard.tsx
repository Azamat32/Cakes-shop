import React, { useState } from "react";
import DashboardLog from "./DashboardLog";
import DashboardReg from "./DashboardReg";
import "./UnloggedDashboard.scss";

const UnloggedDashboard: React.FC = () => {
  const [showRegistration, setShowRegistration] = useState(true);

  const handleTabChange = (isRegistrationTab: boolean) => {
    setShowRegistration(isRegistrationTab);
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
          <DashboardReg  />
        ) : (
          <DashboardLog  />
        )}
      </div>
    </div>
  );
};

export default UnloggedDashboard;
