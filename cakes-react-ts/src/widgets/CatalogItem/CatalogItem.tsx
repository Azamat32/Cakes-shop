import React, { useState } from "react";
import Loader from "../Loader/Loader";
import axios from "axios";
import defaultImage from "../../assets/ExampleGallery/cake1.jpg";
import jwtDecode from "jwt-decode";
import {
  addItemToBasket,
  fetchBasketItemsAsync,
} from "../../store/reducers/redusers";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import close from "../../assets/Icons/close-svgrepo-com.svg";

type ItemProps = {
  key: number;
  itemImage: string;
  price: number;
  title: string;
  role: string;
};

import "./CatalogItem.scss";

const CatalogItem = (props: ItemProps) => {
  const dispatch = useDispatch();
  const dispatch2: AppDispatch = useDispatch();

  const { price, title, itemImage, role } = props;
  const [isLoading, setIsLoading] = useState(true);
  const [isAddingToBasket, setIsAddingToBasket] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleBuyButtonClick = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    setIsAddingToBasket(true);
    setError(null);

    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        // Handle case when token is missing or expired
        setIsAddingToBasket(false);
        setError("Вы не зарегестрированы");
        return;
      }
      const decodedToken = jwtDecode<any>(token);
      const userId = decodedToken.userId;
      const filename = itemImage.substring(itemImage.lastIndexOf("/") + 1);
      await axios.post(
        "http://localhost:5000/api/basket/addToBasket",
        {
          user_id: userId,
          productName: title,
          price,
          img: filename,
          role,
        },
        { headers: { Authorization: token } }
      );

      dispatch(
        addItemToBasket({
          id: 1, // Replace with the actual id of the item from the backend response
          img: filename,
          productName: title,
          price,
          quantity: 1, // Initialize the quantity to 1
        })
      );
      dispatch2(fetchBasketItemsAsync());

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
const deleteError = () => {
  setError(null);

}
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
            {error && (
              <div className="error-message">
                <div className="close">
                  <img src={close} alt="" onClick={deleteError} />
                </div>
                <div className="error_inner">{error}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CatalogItem;
