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
    user: User | null;

  }
  

const authSlice = createSlice({
    name: "auth",
    initialState: {
      isLoggedIn: false,
      isRegistered: false,
      user: null,

    } as AuthState, // Provide the AuthState type here
    reducers: {
      setLoggedIn: (state , action) => {
        state.isLoggedIn = true;
        state.user = action.payload;

      },
      setRegistered: (state) => {
        state.isRegistered = true;
      },
    },
  });
  

export const { setLoggedIn, setRegistered } = authSlice.actions;
export default authSlice.reducer;
