// reducers/index.ts
import { combineReducers } from "redux";
import basketReducer, { BasketState } from "./redusers";
import authReducer, { AuthState } from "./authReducer";

interface RootState {
  basket: BasketState;
  auth: AuthState;
}

const rootReducer = combineReducers<RootState>({
  basket: basketReducer,
  auth: authReducer,
});

export default rootReducer;
