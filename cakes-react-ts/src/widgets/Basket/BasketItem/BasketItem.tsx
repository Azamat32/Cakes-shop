import { useState } from "react";
import axios from "axios";
import close from "../../../assets/Icons/close-svgrepo-com.svg";
import { useDispatch } from "react-redux";
import { removeItemFromBasket ,fetchBasketItemsAsync} from "../../../store/reducers/redusers";
import { AppDispatch } from "../../../store/store";

type BasketProps = {
  id: number;
  img: string;
  price: number;
  productName: string;
};

const BasketItem = (props: BasketProps) => {
  const { id, img, price, productName  } = props;
    const dispatch = useDispatch()
    const dispatch2: AppDispatch = useDispatch();

  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrement = () => {
    setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 0));
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

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="Basket_item">
      <div className="basket_item_inner">
        <div className="basket_item_left">
          <img src={`http://localhost:5000/${img}`} alt="" />
        </div>
        <div className="Basket_item_right">
          <h1>{productName}</h1>
          <div className="basket_img">
            <img onClick={handleDelete} src={close} alt="" />
          </div>
          <div className="button_control">
            <div className="control_item">
              <button onClick={handleDecrement}>-</button>
              <span>{quantity}</span>
              <button onClick={handleIncrement}>+</button>
            </div>
          </div>

          <div className="basket_price">{price}</div>
        </div>
      </div>
    </div>
  );
};

export default BasketItem;
