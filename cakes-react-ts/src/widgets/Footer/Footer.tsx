import logo from "../../assets/Icons/Logo.png";
import { NavLink } from "react-router-dom";
import whatsapp from "../../assets/Icons/whatsapp.svg";
import insta from "../../assets/Icons/insta.svg";

import "./Footer.scss";
type Props = {};

const Footer = (_props: Props) => {
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
          <div className="footer_line"></div>
          <div className="footer_bottom">
            <div className="spravka">
                <a href="#">Пользователькое соглашение |</a>
                <a href="#"> ©Все данные защищены</a>

            </div>
            <div className="media_links">
                <a href="#"><img src={insta} alt="" /></a>
                <a href="#"><img src={whatsapp} alt="" /></a>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
