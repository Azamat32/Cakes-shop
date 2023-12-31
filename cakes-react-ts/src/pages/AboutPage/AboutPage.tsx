type Props = {};
import Examle3 from "../../assets/ExampleGallery/conditer3.jpg";
import "./AboutPage.scss";
const AboutPage = (_props: Props) => {
  return (
    <div className="about">
      <div className="container">
        <div className="about_inner">
          <div className="about_wrap">
            <div className="about_left">
              <p>
                Добро пожаловать в наш магазин кондитерских товаров для
                настоящих мастеров сладкого искусства! Мы с радостью
                представляем вам широкий ассортимент высококачественных
                продуктов и инструментов, которые помогут вам создавать
                волшебство в каждой сладкой композиции.
                <br /> <br /> Приобретая у нас, вы можете быть уверены в
                качестве каждого товара. Мы тщательно подбираем поставщиков и
                предлагаем только проверенные временем ингредиенты, уникальные
                формы и прочные инструменты для лучших результатов. Независимо
                от того, являетесь ли вы опытным профессиональным кондитером или
                начинающим учеником, у нас найдется все необходимое для вашего
                успеха. <br /> <br /> Сладкие моменты ждут вас у нас в магазине
                кондитерских товаров для профессионалов. Сделайте шаг к
                искушению и волшебству уже сегодня!
              </p>
            </div>
            <div className="about_right">
              <img src={Examle3} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
