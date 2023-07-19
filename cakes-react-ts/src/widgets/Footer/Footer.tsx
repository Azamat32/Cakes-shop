import logo from "../../assets/Icons/Logo.png";
import { NavLink } from "react-router-dom";

import "./Footer.scss";
type Props = {};

const Footer = (props: Props) => {
  return (
    <div className="Footer">
      <div className="container">
        <div className="footer_inner">
          <div className="footer_header">
            <div className="footer_logo">
              <img src={logo} alt="" />
            </div>
            <div className="footer_links">
              <NavLink to="/">Каталог</NavLink>
              <NavLink to="/about">О нас</NavLink>
              <NavLink to="/contact">Контакты</NavLink>
            </div>
            <a href="#">+7 (771) 555 60 60</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
