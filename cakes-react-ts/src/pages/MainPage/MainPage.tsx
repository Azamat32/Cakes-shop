import { useState } from "react";

import Slider from "../../widgets/Slider/Slider";
import Examle1 from "../../assets/ExampleGallery/conditer1.jpg";
import Examle2 from "../../assets/ExampleGallery/conditer2.jpg";
import milk3 from "../../assets/ExampleGallery/milk3.jpeg";
import milk4 from "../../assets/ExampleGallery/milk4.jpeg";

import Examle3 from "../../assets/ExampleGallery/conditer3.jpg";
import Examle4 from "../../assets/ExampleGallery/conditer4.jpg";

import cake2 from "../../assets/ExampleGallery/cake2.jpg";
import pie1 from "../../assets/ExampleGallery/pie1.jpg";
import other1 from "../../assets/ExampleGallery/other1.jpg";
import other2 from "../../assets/ExampleGallery/other2.jpg";
import other3 from "../../assets/ExampleGallery/other3.jpg";
import other4 from "../../assets/ExampleGallery/other4.jpg";
import other5 from "../../assets/ExampleGallery/other5.jpg";
import other6 from "../../assets/ExampleGallery/other6.jpg";

import cake4 from "../../assets/ExampleGallery/cake4.jpg";

import "./MainPage.scss";
import CatalogItem from "../../widgets/CatalogItem/CatalogItem";
type Props = {};

const MainPage = (_props: Props) => {
  const [activeTab, setActiveTab] = useState("Формы для запекания");
  const handleTabClick = (role: string) => {
    setActiveTab(role);
  };

  const images = [
    { img: Examle1 },
    { img: Examle2 },
    { img: Examle3 },
    { img: Examle4 },
  ];
  const Catalog = [
    {
      itemImage: cake2,
      title: "Test2",
      price: 2300,
      role: "Молочные продукты",
    },
    {
      itemImage: milk3,
      title: "Test2",
      price: 2300,
      role: "Молочные продукты",
    },
    {
      itemImage: milk4,
      title: "Test2",
      price: 2300,
      role: "Молочные продукты",
    },

    {
      itemImage: cake4,
      title: "Test4",
      price: 2300,
      role: "Украшения",
    },
    {
      itemImage: pie1,
      title: "Test1",
      price: 2300,
      role: "Продукты для Коктелей",
    },

    {
      itemImage: other1,
      title: "Test1",
      price: 2300,
      role: "Инструменты для кондитера",
    },
    {
      itemImage: other2,
      title: "Test1",
      price: 2300,
      role: "Формы для запекания",
    },
    {
      itemImage: other3,
      title: "Test1",
      price: 2300,
      role: "Формы для запекания",
    },
    {
      itemImage: other4,
      title: "Test1",
      price: 2300,
      role: "Формы для запекания",
    },
    {
      itemImage: other5,
      title: "Test1",
      price: 2300,
      role: "Формы для запекания",
    },
    {
      itemImage: other6,
      title: "Test1",
      price: 2300,
      role: "Формы для запекания",
    },
  ];
  const filteredItems = Catalog.filter((item) => item.role === activeTab);
  const catalogItemsRendered = filteredItems.map((item, index) => (
    <CatalogItem
      key={index}
      itemImage={item.itemImage}
      title={item.title}
      price={item.price}
      role={item.role}
    />
  ));

  return (
    <div className="container">
      <Slider sliderData={images} />
      <div className="catalog_inner">
        <div className="catalog_title">
          <h1>Наш каталог</h1>
          <div className="catalog_wrap">
            <div className="catalog_tabs">
              <button
                className={activeTab === "Формы для запекания" ? "active" : ""}
                onClick={() => handleTabClick("Формы для запекания")}
              >
                Формы для запекания
              </button>
              <button
                className={activeTab === "Молочные продукты" ? "active" : ""}
                onClick={() => handleTabClick("Молочные продукты")}
              >
                Молочные продукты
              </button>
              <button
                className={
                  activeTab === "Инструменты для кондитера" ? "active" : ""
                }
                onClick={() => handleTabClick("Инструменты для кондитера")}
              >
                Инструменты для кондитера
              </button>
              <button
                className={activeTab === "Украшения" ? "active" : ""}
                onClick={() => handleTabClick("Украшения")}
              >
                Украшения
              </button>

              <button
                className={
                  activeTab === "Продукты для Коктелей" ? "active" : ""
                }
                onClick={() => handleTabClick("Продукты для Коктелей")}
              >
                Продукты для Коктелей
              </button>
            </div>
            <div className="catalog_content">{catalogItemsRendered}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
