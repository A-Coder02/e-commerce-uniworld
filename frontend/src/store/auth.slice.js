// Redux Toolkit slice to manage user data and tokens
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  accessToken: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setTokens: (state, action) => {
      state.accessToken = action.payload.accessToken;
      sessionStorage.setItem("accessToken", state.accessToken);
    },
    clearAuth: (state) => {
      state.user = null;
      state.accessToken = null;
      sessionStorage.removeItem("accessToken");
    },
  },
});

export const { setUser, setTokens, clearAuth } = authSlice.actions;

export default authSlice.reducer;
