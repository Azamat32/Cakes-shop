// store.tsx
import { createStore } from "redux";
import basketReducer from "./reducers/redusers"; // Assuming you have already created the basketReducer

// Define the type for the item in the basket
export interface BasketItem {
  itemImage: string;
  price: number;
  title: string;
  role: string;
}

// Define the type for the basket state
export interface BasketState {
  items: BasketItem[];
}

// Step 2: Create the store
const store = createStore<BasketState, any, any, any>(basketReducer);

export default store;
