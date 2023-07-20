import {  BasketState } from "../store";

const initialState: BasketState = {
  items: [],
};

const basketReducer = (state = initialState, action: { type: any; payload: any; }) => {
  switch (action.type) {
    case "ADD_TO_BASKET":
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    default:
      return state;
  }
};

export default basketReducer;
