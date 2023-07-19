import { useState } from "react";
import Loader from "../Loader/Loader";
import defaultImage from '../../assets/ExampleGallery/cake1.jpg'
type ItemProps = {
  itemImage: string;
  price: number;
  title: string;
  role: string;
};
import "./CatalogItem.scss";
const CatalogItem = (props: ItemProps) => {
  const { price, title, itemImage, role } = props;
  const [isLoading, setIsLoading] = useState(true);

  const handleImageLoad = () => {
    setIsLoading(false);
  };
  return (
    <div className="Item" role={role}>
      <div className="item_inner">
        <div className="item_image">
          {isLoading ? (
            <div className="loader-container">
              <Loader />
            </div>
          ) : null}
          <img
            src={isLoading ? defaultImage : itemImage}
            className={isLoading ? "image-loading" : ""}
            alt=""
            onLoad={handleImageLoad}
          />
        </div>
        <div className="item_content">
          <div className="item_text">
            <div className="item_product_name">
              <span>{title}</span>
            </div>
            <div className="item_product_cost">
              <span>{price} ₸</span>
            </div>
          </div>
          <div className="item_btn">
            <button>Купить</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CatalogItem;
