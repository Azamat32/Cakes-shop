import { useState } from "react";
import "./DashboardPage.scss";
import AllProducts from "./AllProducts/AllProducts";
import AddNewProducts from "./AddNewProducts/AddNewProducts";
import AllUsers from "./AllUsers/AllUsers";
import AddNewModerators from "./AddNewModerators/AddNewModerators";
import { NavLink } from "react-router-dom";

const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState("products");

  const handleTabClick = (tab: any) => {
    setActiveTab(tab);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "products":
        return <AllProducts />;
      case "add_products":
        return <AddNewProducts />;

      case "users":
        return <AllUsers />;
      case "add_moderators":
        return <AddNewModerators />;
      default:
        return <h2>Invalid Tab</h2>;
    }
  };

  return (
    <div className="Dashboard">
      <div className="sidebar">
        <div className="title">
          <h1>Админ</h1>
        </div>
        <div className="sidebar_list">
         

          <button
            className={activeTab === "products" ? "active" : ""}
            onClick={() => handleTabClick("products")}
          >
            Все продукты
          </button>
          <button
            className={activeTab === "add_products" ? "active" : ""}
            onClick={() => handleTabClick("add_products")}
          >
            Добавить новые продукты
          </button>
          
          <button
            className={activeTab === "users" ? "active" : ""}
            onClick={() => handleTabClick("users")}
          >
            Все пользователи
          </button>
          <button
            className={activeTab === "add_moderators" ? "active" : ""}
            onClick={() => handleTabClick("add_moderators")}
          >
            Добавить новую категорию
          </button>
          <button>
            <NavLink to="/">
              На главную
            </NavLink>
          </button>
        </div>
      </div>
      <div className="dashboard_inner">{renderTabContent()}</div>
    </div>
  );
};

export default DashboardPage;
