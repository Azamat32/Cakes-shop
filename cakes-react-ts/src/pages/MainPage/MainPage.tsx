import { useState, useEffect } from "react";
import axios from "axios"
import Slider from "../../widgets/Slider/Slider";
import Examle1 from "../../assets/ExampleGallery/conditer1.jpg";
import Examle2 from "../../assets/ExampleGallery/conditer2.jpg";


import Examle3 from "../../assets/ExampleGallery/conditer3.jpg";
import Examle4 from "../../assets/ExampleGallery/conditer4.jpg";



import "./MainPage.scss";
import CatalogItem from "../../widgets/CatalogItem/CatalogItem";
import Loader from "../../widgets/Loader/Loader";
type Props = {};
interface Product {
  img: string;
  name: string;
  price: number;
  type: string;
}
interface Category {
  id: number;
  name: string;
}

const MainPage = (_props: Props) => {
  const [activeTab, setActiveTab] = useState("Форма для выпечки");
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);
 
  useEffect(() => {
    // Make an API request to fetch the products from the backend
    
    axios.get("http://localhost:5000/api/products/catalog")
      .then((response) => {
        setProducts(response.data);

        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }, []);


  useEffect(() => {
    // Fetch the categories from the backend
    axios
      .get("http://localhost:5000/api/products/categories")
      .then((response) => {
        setCategories(response.data);
        if (response.data.length > 0) {
          setActiveTab(response.data[0].name);
        }
      });
  }, []);

  const handleTabClick = (categoryName: string) => {
    setActiveTab(categoryName);
  };

  const images = [
    { img: Examle1 },
    { img: Examle2 },
    { img: Examle3 },
    { img: Examle4 },
  ];
 

  
  const filteredItems = products.filter((item) => item.type === activeTab);
  const catalogItemsRendered = filteredItems.map((item, index) => (
    <CatalogItem
      key={index}
      itemImage={`http://localhost:5000/${item.img}`} 
      title={item.name}
      price={item.price}
      role={item.type}
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
            {categories.map((category) => (
                <button
                  key={category.id}
                  className={activeTab === category.name ? "active" : ""}
                  onClick={() => handleTabClick(category.name)}
                >
                  {category.name}
                </button>
              ))}
            </div>
            <div className="catalog_content">
              
            {isLoading ? (
                <Loader />
              ) : (
                /* Display the catalog items when data is loaded */
                catalogItemsRendered
              )}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
