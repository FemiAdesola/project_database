import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token") || null,
  member: JSON.parse(localStorage.getItem("member")) || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.token = action.payload.token;
      state.member = action.payload.member;
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("member", JSON.stringify(action.payload.member));
    },
    logout: (state) => {
      state.token = null;
      state.member = null;
      localStorage.removeItem("token");
      localStorage.removeItem("member");
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
