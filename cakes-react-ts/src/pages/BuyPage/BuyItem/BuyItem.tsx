import { useEffect, useState } from "react";
import axios from "axios";
import close from "../../../assets/Icons/close-svgrepo-com.svg";
import { useDispatch } from "react-redux";
import {
  removeItemFromBasket,
  fetchBasketItemsAsync,
} from "../../../store/reducers/redusers";
import { AppDispatch } from "../../../store/store";
import "./BuyItem.scss";
type BasketProps = {
  id: number;
  img: string;
  price: number;
  productName: string;
};

const BuyItem = (props: BasketProps) => {
  const { id, img, price, productName } = props;
  const dispatch = useDispatch();
  const dispatch2: AppDispatch = useDispatch();

  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(price);
  const fetchBasketItems = async () => {
    try {
      const token = localStorage.getItem("authToken");

      const response = await axios.get(
        `http://localhost:5000/api/basket/getQuantity/${id}`, // Pass the id as part of the URL path

        { headers: { Authorization: token } }
      );

      setQuantity(response.data.quantity);
    } catch (error) {}
  };
  useEffect(() => {
    // Fetch the quantity of the item when the component mounts
    fetchBasketItems();
  }, []);
  useEffect(() => {
    // Update the total price whenever quantity changes
    setTotalPrice(price * quantity);
  }, [quantity, price]);
  const handleIncrement = async () => {
    try {
      // Send a request to increase the quantity of the item
      const token = localStorage.getItem("authToken");
      await axios.put(
        `http://localhost:5000/api/basket/increaseQuantity/${id}`, // Pass the id as part of the URL path
        {},
        { headers: { Authorization: token } }
      );
      setQuantity((prevQuantity) => prevQuantity + 1);
      fetchBasketItems();
      dispatch2(fetchBasketItemsAsync());
    } catch (error) {}
  };

  const handleDecrement = async () => {
    try {
      // Send a request to decrease the quantity of the item
      const token = localStorage.getItem("authToken");
      await axios.put(
        `http://localhost:5000/api/basket/decreaseQuantity/${id}`, // Pass the id as part of the URL path
        {},
        { headers: { Authorization: token } }
      );
      setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1));
      fetchBasketItems();
      dispatch2(fetchBasketItemsAsync());
    } catch (error) {}
  };

  const handleDelete = async () => {
    try {
      // Send a request to delete the item from the backend
      const token = localStorage.getItem("authToken");
      await axios.delete(
        `http://localhost:5000/api/basket/deleteFromBasket/${id}`, // Pass the id as part of the URL path
        { headers: { Authorization: token } }
      );
      dispatch(removeItemFromBasket(id));
      dispatch2(fetchBasketItemsAsync());
    } catch (error) {}
  };

  return (
    <div className="Basket_item">
      <div className="basket_item_inner">
        <div className="basket_item_content">
          <div className="basket_name">
            <div className="basket_img">
              <img src={`http://localhost:5000/${img}`} alt="" />
            </div>
            <h1>{productName}</h1>
          </div>

          <div className="button_control">
            <div className="control_item">
              <button onClick={handleDecrement}>-</button>
              <span>{quantity}</span>
              <button onClick={handleIncrement}>+</button>
            </div>
          </div>
          <div className="basket_price">{totalPrice}</div>

          <div className="close">
            <img onClick={handleDelete} src={close} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyItem;
