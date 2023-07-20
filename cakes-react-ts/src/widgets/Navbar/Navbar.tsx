import  { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.scss";
import logo from "../../assets/Icons/Logo.png";
import user from "../../assets/Icons/account.d75552a1.svg";
import exit from "../../assets/Icons/logout.408bc926.svg";
import baket from "../../assets/Icons/baket.svg";
import Basket from "../Basket/Basket";

type Props = {};

const Navbar = (_props: Props) => {
  const [isBasketOpen, setIsBasketOpen] = useState(false); // New state for the basket component
  const [isDarkOverlayVisible, setIsDarkOverlayVisible] = useState(false);

  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isBurgerActive, setIsBurgerActive] = useState(false);

  const toggleLanguageDropdown = () => {
    setIsLanguageDropdownOpen(!isLanguageDropdownOpen);
    setIsUserDropdownOpen(false);
  };

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
    setIsLanguageDropdownOpen(false);
  };

  const toggleBurger = () => {
    setIsBurgerActive(!isBurgerActive);
  };

  const toggleBasket = () => {
    setIsBasketOpen(!isBasketOpen);
    setIsDarkOverlayVisible(!isDarkOverlayVisible);
  };

  const handleBasketClose = () => {
    setIsBasketOpen(false);
    setIsDarkOverlayVisible(false);
  };

  return (
    <div className={`navbar`}>
      <div className="container">
        <div className="navbar_inner">
          <div className="nav_logo">
            <img src={logo} alt="" />
          </div>
          <div className={`nav_inner_links ${isBurgerActive ? "active" : ""}`}>
            <div className="nav_links">
              <NavLink to="/" onClick={toggleBurger}>
                Каталог
              </NavLink>
              <NavLink to="/about" onClick={toggleBurger}>
                О нас
              </NavLink>
              <NavLink to="/contact" onClick={toggleBurger}>
                Контакты
              </NavLink>
            </div>

            <div className="nav_UI">
              <div className="nav_language" onClick={toggleLanguageDropdown}>
                <span>RU</span>

                {isLanguageDropdownOpen && (
                  <div className="language_dropdown">
                    <span>RU</span>
                    <span>KZ</span>
                    <span>ENG</span>
                  </div>
                )}
              </div>
              <div className="nav_user">
                <img src={user} alt="" onClick={toggleUserDropdown} />
                {isUserDropdownOpen && (
                  <div className="nav_user_dropdown">
                    <NavLink to="/user">
                      <img src={user} alt="" />
                      Профиль
                    </NavLink>
                    <NavLink to="/exit">
                      <img src={exit} alt="" />
                      Выход
                    </NavLink>
                  </div>
                )}
              </div>
              <div className="nav_backet" onClick={toggleBasket}>
                <img src={baket} alt="" />
              </div>
            </div>
          </div>
          <div className="adaptive_side">
            <div className="nav_backet_adaptive">
              <NavLink to="/order">
                <img src={baket} alt="" />
              </NavLink>
            </div>
            <div
              className={`nav_burger_btn ${isBurgerActive ? "active" : ""}`}
              onClick={toggleBurger}
            >
              <span></span>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`dark-overlay ${isBasketOpen ? "visible" : ""}`}
        onClick={handleBasketClose}
      ></div>
      <Basket BasketState={isBasketOpen} onCloseBasket={handleBasketClose} />
    </div>
  );
};

export default Navbar;
