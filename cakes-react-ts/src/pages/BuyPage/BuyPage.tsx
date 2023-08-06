import { Key, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import BuyItem from "./BuyItem/BuyItem";
import { setBasketError, setBasketItems } from "../../store/reducers/redusers";
import "./BuyPage.scss";
type Props = {};

const BuyPage = (_props: Props) => {
  const { t } = useTranslation();
  const basketItems = useSelector((state: any) => state.basket.basketItems);
  const loading = useSelector((state: any) => state.basket.loading);
  const error = useSelector((state: any) => state.basket.error);
  const authToken = localStorage.getItem("authToken");
  const dispatch = useDispatch();
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
  return (
    <div className="buyPage">
      <div className="container">
        <div className="title">
          <h1>{t("buy")}</h1>
        </div>
        <div className="orders_wrap">
          <div className="order_header">
            <span>Продукт</span>
            <span>Кол-вл</span>
            <span>Цена</span>
          </div>
          {basketItems.map(
            (
              item: {
                id: number;
                img: string;
                price: number;
                productName: string;
              },
              index: Key | null | undefined
            ) => (
              <BuyItem
                id={item.id}
                key={index}
                img={item.img}
                price={item.price}
                productName={item.productName}
              />
            )
          )}
        </div>
        <div className="orders_form">
          <div className="title">
            <h1>Доставка</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyPage;
