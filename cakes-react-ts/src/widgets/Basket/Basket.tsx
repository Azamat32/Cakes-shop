import close from "../../assets/Icons/close-svgrepo-com.svg";
import "./Basket.scss";
import { useState } from "react";
import { useSelector } from "react-redux";
import {NavLink} from "react-router-dom"
import { BasketState } from "../../store/store"; // Replace with the correct path to your store.tsx file

type BasketProps = {
  BasketState: boolean;
  onCloseBasket: () => void;
};

const Basket = (props: BasketProps) => {
  const { BasketState, onCloseBasket } = props;
  const basketItems = useSelector((state: BasketState) => state.items);
  const [isBasketOpen] = useState(true); // New state to manage basket visibility

  return (
    <>
      {" "}
      {isBasketOpen && ( // Show the basket only when isBasketOpen is true
        <div className={`Basket ${BasketState ? "open" : ""}`}>
          {" "}
          <div className="Basket_inner">
            <div className="basket_header">
              <h1>Корзина</h1>
              <span className="close" onClick={onCloseBasket}>
                <img src={close} alt="" />
              </span>
            </div>
            <div className="basket_content">
              {basketItems.length === 0 ? (
                <p className="nothing">К сожаление вы еще ничего не купили</p>
              ) : (
                basketItems.map((item) => (
                  <div className="Basket_items">
                    <div className="Basket_item">
                      <div className="basket_item_inner">
                        <div className="basket_item_left">
                          <img src={item.itemImage} alt="" />
                        </div>
                        <div className="Basket_item_right">
                          <h1>{item.title}</h1>
                          <div className="basket_img">
                            <img src={close} alt="" />
                          </div>
                          <div className="button_control">
                            <div className="control_item">
                              <button>+</button>
                              <span>1</span>
                              <button>-</button>
                            </div>
                          </div>

                          <div className="basket_price">{item.price}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
              <NavLink to="/order"> <button className="btn">Оплатить</button></NavLink>
             
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Basket;
