import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.scss';
import logo from '../../assets/Icons/Logo.png';
import user from '../../assets/Icons/account.d75552a1.svg';
import exit from '../../assets/Icons/logout.408bc926.svg';
import baket from '../../assets/Icons/baket.svg';

type Props = {};

const Navbar = (_props: Props) => {
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

  return (
    <div className={`navbar`}>
      <div className="container">
        <div className="navbar_inner">
          <div className="nav_logo">
            <img src={logo} alt="" />
          </div>
          <div
            className={`nav_inner_links ${isBurgerActive ? 'active' : ''}`}
          >
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
              <div className="nav_backet">
                <img src={baket} alt="" />
              </div>
            </div>
          </div>

          <div
            className={`nav_burger_btn ${isBurgerActive ? 'active' : ''}`}
            onClick={toggleBurger}
          >
            <span></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
