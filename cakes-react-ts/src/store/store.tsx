// store.tsx
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers/index";
import { AuthState } from "./reducers/authReducer";
import { BasketState } from "./reducers/redusers";

// Define the type for the root state
export interface RootState {
  auth: AuthState;
  basket: BasketState;
}

const store = configureStore({
  reducer: rootReducer,
  // Add other configuration options as needed
});

export default store;
