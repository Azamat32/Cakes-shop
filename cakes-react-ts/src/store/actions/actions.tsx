import { BasketItem } from "../store";

export const addToBasket = (item: BasketItem) => {
  return {
    type: "ADD_TO_BASKET",
    payload: item,
  };
};
