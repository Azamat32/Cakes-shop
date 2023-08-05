import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import {AppThunk} from "../store"
interface BasketItem {
  id: number;
  img: string;
  productName: string;
  price: number;
  quantity: number;
}

interface BasketState {
  basketItems: BasketItem[];
  loading: boolean;
  error: string | null;
}

const initialState: BasketState = {
  basketItems: [],
  loading: true,
  error: null,
};

const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    setBasketItems: (state, action: PayloadAction<BasketItem[]>) => {
      state.basketItems = action.payload;
      state.loading = false;
      state.error = null;
    },
    removeItemFromBasket: (state, action: PayloadAction<number>) => {
      state.basketItems = state.basketItems.filter(
        (item) => item.id !== action.payload
      );

    },
    addItemToBasket: (state, action: PayloadAction<BasketItem>) => {
      // Check if the item already exists in the basket
      const existingItem = state.basketItems.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        // If the item exists, increase its quantity
        existingItem.quantity += 1;
      } else {
        // If the item doesn't exist, add it to the basket with quantity 1
        state.basketItems.push({ ...action.payload, quantity: 1 });
      }
    },
    setBasketError: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const fetchBasketItemsAsync = (): AppThunk => async (dispatch) => {
  try {
    const token = localStorage.getItem("authToken");
    const response = await axios.get(
      "http://localhost:5000/api/basket/getAllBasket", // Replace with your backend API endpoint to get all basket items
      { headers: { Authorization: token } }
    );
    dispatch(setBasketItems(response.data));
  } catch (error) {
    dispatch(setBasketError("Failed to fetch basket items"));
  }
};

export const {
  setBasketItems,
  removeItemFromBasket,
  setBasketError,
  addItemToBasket,
} = basketSlice.actions;

export default basketSlice.reducer;
