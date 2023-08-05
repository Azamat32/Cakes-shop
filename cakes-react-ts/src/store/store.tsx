// store.ts
import { configureStore, ThunkAction, Action,ThunkDispatch  } from "@reduxjs/toolkit";
import rootReducer from "./reducers/index";
import { AuthState } from "./reducers/authReducer";

// Define the type for the root state
export interface RootState {
  auth: AuthState;
}

// Define the AppThunk type
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export type AppDispatch = ThunkDispatch<RootState, void, Action<string>>;

const store = configureStore({
  reducer: rootReducer,
  // Add other configuration options as needed
});

export default store;
