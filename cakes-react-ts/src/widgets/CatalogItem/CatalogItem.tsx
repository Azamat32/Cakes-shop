import React, { useState } from "react";
import Loader from "../Loader/Loader";
import axios from "axios";
import defaultImage from "../../assets/ExampleGallery/cake1.jpg";

type ItemProps = {
  key: number;
  itemImage: string;
  price: number;
  title: string;
  role: string;
};

import "./CatalogItem.scss";

const CatalogItem = (props: ItemProps) => {
  const { price, title, itemImage, role,key } = props;
  const [isLoading, setIsLoading] = useState(true);
  const [isAddingToBasket, setIsAddingToBasket] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleBuyButtonClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsAddingToBasket(true);
    setError(null);

    try {
      const token = localStorage.getItem("authToken");
      console.log(itemImage);
      
      await axios.post(
        "http://localhost:5000/api/basket/addToBasket",
        {
          product_id : key,
          productName:title,
          price,
          img:itemImage,
          role,

        },
        { headers: { Authorization: token } }
      );
      setIsAddingToBasket(false);
      // Optional: Show a success message to the user if needed
    } catch (error) {
      setIsAddingToBasket(false);
      setError("Failed to add product to basket");
    }
  };

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
            alt={title} // Add alt attribute with the title as the value
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
            <button onClick={handleBuyButtonClick} disabled={isAddingToBasket}>
              {isAddingToBasket ? "Добавляется..." : "Купить"}
            </button>
            {error && <div className="error-message">{error}</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CatalogItem;
