import close from "../../assets/Icons/close-svgrepo-com.svg";
import "./Basket.scss";
import { Key, useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBasketItems, setBasketError  } from "../../store/reducers/redusers";

import axios from "axios";
import { NavLink } from "react-router-dom";
import BasketItem from "./BasketItem/BasketItem";
type BasketProps = {
  BasketState: boolean;
  onCloseBasket: () => void;
};

const Basket = (props: BasketProps) => {
  const { BasketState, onCloseBasket } = props;
  const dispatch = useDispatch();

  const [isBasketOpen] = useState(true); // New state to manage basket visibility
  const basketItems = useSelector((state:any) => state.basket.basketItems);
  const loading = useSelector((state:any) => state.basket.loading);
  const error = useSelector((state:any) => state.basket.error);
  const authToken = localStorage.getItem("authToken");

  useEffect(() => {
    if (authToken) {
      const fetchBasketItems = async () => {
        try {
          const response = await axios.get(
            "http://localhost:5000/api/basket/getAllBasket",
            { headers: { Authorization: authToken } }
          );
          dispatch(setBasketItems(response.data));
        } catch (error) {
          dispatch(setBasketError("Failed to fetch basket items"));
        }

      };
      fetchBasketItems();
    }
  }, [dispatch]);

  // Function to handle item deletion and refetch basket items
 // Calculate the total sum of prices using useMemo
 const totalPrice = useMemo(() => {
  return basketItems.reduce((total: number, item: { price: number; quantity: number; }) => total + item.price * item.quantity, 0);
}, [basketItems]);

  return (
    <>
      {isBasketOpen && (
        <div className={`Basket ${BasketState ? "open" : ""}`}>
          <div className="Basket_inner">
            <div className="basket_header">
              <h1>Корзина</h1>
              <span className="close" onClick={onCloseBasket}>
                <img src={close} alt="" />
              </span>
            </div>
            <div className="basket_content">
              {loading ? (
                <p>Loading...</p>
              ) : error ? (
                <p className="error-message">{error}</p>
              ) : !authToken ||basketItems.length === 0 ? (
                <p className="nothing">К сожаление вы еще ничего не купили</p>
              ) : (
                <>
              {basketItems.map((item: { id: number; img: string; price: number; productName: string; }, index: Key | null | undefined) => (
                  <BasketItem
                    id={item.id}
                    key={index}
                    img={item.img}
                    price={item.price}
                    productName={item.productName}
                  />
                ))}
                <div className="total_sum">
                  <h1>Общая сумма</h1>
                  <span>{totalPrice}</span>
                </div>
                <NavLink to="/order">
                <button className="btn">Оплатить</button>
              </NavLink>
              </>
              )}
              
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Basket;
