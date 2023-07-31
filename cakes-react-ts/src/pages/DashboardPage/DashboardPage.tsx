import { useState } from "react";
import "./DashboardPage.scss";
import UserProfile from "./UserProfile/UserProfile";
import AllCategories from "./AllCategories/AllCategories";
import AllProducts from "./AllProducts/AllProducts";
import AddNewProducts from "./AddNewProducts/AddNewProducts";
import EditProductDescription from "./EditProductDescription/EditProductDescription";
import AllUsers from "./AllUsers/AllUsers";
import AddNewModerators from "./AddNewModerators/AddNewModerators";

const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const handleTabClick = (tab: any) => {
    setActiveTab(tab);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return <UserProfile />;
      case "categories":
        return <AllCategories />;
      case "products":
        return <AllProducts />;
      case "add_products":
        return <AddNewProducts />;
      case "edit_description":
        return <EditProductDescription />;
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
            className={activeTab === "profile" ? "active" : ""}
            onClick={() => handleTabClick("profile")}
          >
            Профиль
          </button>
          <button
            className={activeTab === "categories" ? "active" : ""}
            onClick={() => handleTabClick("categories")}
          >
            Все категории продуктов
          </button>
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
            className={activeTab === "edit_description" ? "active" : ""}
            onClick={() => handleTabClick("edit_description")}
          >
            Изменить описания продукта
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
        </div>
      </div>
      <div className="dashboard_inner">{renderTabContent()}</div>
    </div>
  );
};

export default DashboardPage;
