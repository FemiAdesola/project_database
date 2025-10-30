// -------------------- IMPORTS --------------------
import { configureStore } from "@reduxjs/toolkit"; // Redux Toolkit function to create a store
import authReducer from "./slice/authSlice"; // Import the authentication slice reducer

// -------------------- CONFIGURE STORE --------------------
export default configureStore({
  reducer: {
    // Register slices
    auth: authReducer, // This "auth" state will be managed by authReducer
  },
});
