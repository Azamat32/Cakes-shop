import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLoggedIn } from "../../store/reducers/authReducer";
import { useNavigate } from "react-router-dom";

import "./Navbar.scss";
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import logo from "../../assets/Icons/Logo.png";
import user from "../../assets/Icons/account.d75552a1.svg";
import exit from "../../assets/Icons/logout.408bc926.svg";
import baket from "../../assets/Icons/baket.svg";
import Basket from "../Basket/Basket";
import LanguageDashboard from "./LanguageDashboard/LanguageDashboard";
import UnloggedDashboard from "./UnloggedDashboard/UnloggedDashboard";
import {RootState} from "../../store/store";
const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    // Clear the token from local storage or cookie
    localStorage.removeItem("authToken");
  
 
    
    // Dispatch the action to set the user as logged out
    dispatch(setLoggedIn(null));

    // Optionally, redirect to the login page or another route
    navigate("/");
    window.location.reload();

  };
  

  const { t } = useTranslation();

  const [isBasketOpen, setIsBasketOpen] = useState(false);
  const [isDarkOverlayVisible, setIsDarkOverlayVisible] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isBurgerActive, setIsBurgerActive] = useState(false);
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const isRegistered = useSelector((state: RootState) => state.auth.isRegistered);
  const [basketItemCount, setBasketItemCount] = useState(0);
  const basketItems = useSelector((state:any) => state.basket.basketItems);

  useEffect(() => {
    // Update the basket item count whenever the basket items change
    setBasketItemCount(basketItems.length);
  }, [basketItems]);

  const toggleLanguageDropdown = () => setIsLanguageDropdownOpen(!isLanguageDropdownOpen);
  const toggleUserDropdown = () => setIsUserDropdownOpen(!isUserDropdownOpen);
  const toggleBurger = () => setIsBurgerActive(!isBurgerActive);
  const toggleBasket = () => {
    setIsBasketOpen(!isBasketOpen);
    setIsDarkOverlayVisible(!isDarkOverlayVisible);
  };

  const handleBasketClose = () => {
    setIsBasketOpen(false);
    setIsDarkOverlayVisible(false);
  };


  const LanguageDropdown = () => (
    <div className="nav_language" onClick={toggleLanguageDropdown}>
      <span>{t('eng')}</span>
      {isLanguageDropdownOpen && <LanguageDashboard />}
    </div>
  );

  const UserDropdown = () => (
    <div className="nav_user">
      <img src={user} alt="" onClick={toggleUserDropdown} />
      {isUserDropdownOpen ? (
        isLoggedIn || isRegistered ? (
          <div className="nav_user_dropdown">
            <NavLink to="/user">
              <img src={user} alt="" />
              Профиль
            </NavLink>
            <a onClick={handleLogout}>
              <img src={exit} alt="" />
              Выход
            </a>
          </div>
        ) : (
          <UnloggedDashboard
          />
        )
      ) : null}
    </div>
  );
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // Check if the click occurred outside of the UserDropdown and LanguageDropdown elements
      if (
        !target.closest(".nav_user") &&
        !target.closest(".nav_language") &&
        isUserDropdownOpen
      ) {
        setIsUserDropdownOpen(false);
      }

      if (
        !target.closest(".nav_language") &&
        !target.closest(".nav_user") &&
        isLanguageDropdownOpen
      ) {
        setIsLanguageDropdownOpen(false);
      }
    };

    // Add the event listener when the component mounts
    document.addEventListener("click", handleOutsideClick);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isUserDropdownOpen, isLanguageDropdownOpen]); 
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
                {t('catalog')}
              </NavLink>
              <NavLink to="/about" onClick={toggleBurger}>
                {t('about')}
              </NavLink>
              <NavLink to="/contact" onClick={toggleBurger}>
                {t('contact')}
              </NavLink>
            </div>

            <div className="nav_UI">
              <LanguageDropdown />
              <div className="nav_backet" onClick={toggleBasket}>
                <img src={baket} alt="" />
                {basketItemCount > 0 && <span className="basket-item-count">{basketItemCount}</span>}
              </div>
              <UserDropdown />
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


