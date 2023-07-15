import { NavLink } from "react-router-dom";

import logo from "../../assets/Icons/Logo.png";
import user from "../../assets/Icons/account.d75552a1.svg";
import exit from "../../assets/Icons/logout.408bc926.svg";

type Props = {};

const Navbar = (props: Props) => {
  return (
    <div className="navbar">
      <div className="container">
        <div className="navbar_inner">
          <div className="nav_logo">
            <img src={logo} alt="" />
          </div>
          <div className="nav_links">
            <NavLink to="/">Каталог</NavLink>
            <NavLink to="/about">О нас</NavLink>
            <NavLink to="/contact">Контакты</NavLink>
          </div>

          <div className="nav_UI">
            <div className="nav_language">
              <span>RU</span>
              <div className="language_dropdown">
                <span>KZ</span>
                <span>ENG</span>
              </div>
            </div>
            <div className="nav_user">
              <img src={user} alt="" />
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
