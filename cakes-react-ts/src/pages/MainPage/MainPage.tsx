import { useState } from "react";

import Slider from "../../widgets/Slider/Slider";
import Examle1 from "../../assets/ExampleGallery/conditer1.jpg";
import Examle2 from "../../assets/ExampleGallery/conditer2.jpg";

import Examle3 from "../../assets/ExampleGallery/conditer3.jpg";
import cake1 from "../../assets/ExampleGallery/cake1.jpg";
import cake2 from "../../assets/ExampleGallery/cake2.jpg";
import pie1 from "../../assets/ExampleGallery/pie1.jpg";
import pie2 from "../../assets/ExampleGallery/pie2.jpg";
import other1 from "../../assets/ExampleGallery/other1.jpg";
import other2 from "../../assets/ExampleGallery/other2.jpg";
import cake3 from "../../assets/ExampleGallery/cake3.jpg";
import cake4 from "../../assets/ExampleGallery/cake4.jpg";

import "./MainPage.scss";
import CatalogItem from "../../widgets/CatalogItem/CatalogItem";
type Props = {};

const MainPage = (_props: Props) => {
  const [activeTab, setActiveTab] = useState("Торты");
  const handleTabClick = (role: string) => {
    setActiveTab(role);
  };

  const images = [{ img: Examle1 }, { img: Examle2 }, { img: Examle3 }];
  const Catalog = [
    {
      itemImage: cake1,
      title: "Test1",
      price: 2300,
      role: "Торты",
    },
    {
      itemImage: cake2,
      title: "Test2",
      price: 2300,
      role: "Торты",
    },
    {
      itemImage: cake3,
      title: "Test3",
      price: 2300,
      role: "Торты",
    },
    {
      itemImage: cake4,
      title: "Test4",
      price: 2300,
      role: "Торты",
    },
    {
      itemImage: pie1,
      title: "Test1",
      price: 2300,
      role: "Пироги",
    },
    {
      itemImage: pie2,
      title: "Test1",
      price: 2300,
      role: "Пироги",
    },
    {
      itemImage: other1,
      title: "Test1",
      price: 2300,
      role: "Цветы и прочее",
    },
    {
      itemImage: other2,
      title: "Test1",
      price: 2300,
      role: "Цветы и прочее",
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
                className={activeTab === "Торты" ? "active" : ""}
                onClick={() => handleTabClick("Торты")}
              >
                Торты
              </button>
              <button
                className={activeTab === "Пироги" ? "active" : ""}
                onClick={() => handleTabClick("Пироги")}
              >
                Пироги
              </button>
              <button
                className={activeTab === "Печенье" ? "active" : ""}
                onClick={() => handleTabClick("Печенье")}
              >
                Печенье
              </button>
              <button
                className={activeTab === "Пирожные" ? "active" : ""}
                onClick={() => handleTabClick("Пирожные")}
              >
                Пирожные
              </button>
              <button
                className={activeTab === "Выпечка" ? "active" : ""}
                onClick={() => handleTabClick("Выпечка")}
              >
                Выпечка
              </button>
              <button
                className={activeTab === "Цветы и прочее" ? "active" : ""}
                onClick={() => handleTabClick("Цветы и прочее")}
              >
                Цветы и прочее
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
