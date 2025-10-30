// -------------------- IMPORTS --------------------
import { createSlice } from "@reduxjs/toolkit"; // Import createSlice for Redux Toolkit

// -------------------- INITIAL STATE --------------------
/**
 * Stores authentication data:
 * - token: JWT token stored in localStorage (null if not logged in)
 * - member: logged-in user info stored in localStorage (null if not logged in)
 */
const initialState = {
  token: localStorage.getItem("token") || null,
  member: JSON.parse(localStorage.getItem("member")) || null,
};

// -------------------- CREATE AUTH SLICE --------------------
const authSlice = createSlice({
  name: "auth",          // Name of the slice
  initialState,          // Initial state for this slice
  reducers: {
    // -------------------- LOGIN --------------------
    /**
     * Stores token and member info in state and localStorage
     * @param state - current Redux state
     * @param action - payload containing token and member info
     */
    login: (state, action) => {
      state.token = action.payload.token;                 // Update Redux state with token
      state.member = action.payload.member;               // Update Redux state with member info
      localStorage.setItem("token", action.payload.token);       // Persist token in localStorage
      localStorage.setItem("member", JSON.stringify(action.payload.member)); // Persist member info
    },

    // -------------------- LOGOUT --------------------
    /**
     * Clears token and member info from state and localStorage
     */
    logout: (state) => {
      state.token = null;        // Remove token from state
      state.member = null;       // Remove member info from state
      localStorage.removeItem("token");   // Remove token from localStorage
      localStorage.removeItem("member");  // Remove member info from localStorage
    },
  },
});

// -------------------- EXPORT ACTIONS --------------------
export const { login, logout } = authSlice.actions; // Export login and logout actions

// -------------------- EXPORT REDUCER --------------------
export default authSlice.reducer;                  // Export reducer to be added to the store
