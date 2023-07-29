// redusers.ts
export interface BasketState {
  items: BasketItem[];
}

export interface BasketItem {
  itemImage: string;
  price: number;
  title: string;
  role: string;
}

const initialState: BasketState = {
  items: [],
};

const basketReducer = (
  state = initialState,
  action: { type: any; payload: any }
) => {
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
