import { createSlice } from "@reduxjs/toolkit";
export interface User {
  id: number;
  username: string;
  phone: string;
  role: string;
  // Add other user properties here as needed
}

export interface AuthState {
  isLoggedIn: boolean;
  isRegistered: boolean;
  isAdmin: boolean;

  user: User | null;
}

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    isRegistered: false,
    isAdmin: false,
    user: null,
  } as AuthState, // Provide the AuthState type here
  reducers: {
    setAdmin: (state) => {
      state.isAdmin = true;
    },
    setLoggedIn: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    setRegistered: (state) => {
      state.isRegistered = true;
    },
  },
});

export const { setLoggedIn, setRegistered, setAdmin } = authSlice.actions;
export default authSlice.reducer;
