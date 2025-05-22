import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: JSON.parse(localStorage.getItem("user")) || null, // Load user from localStorage on startup
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    removeUser: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
    setUserFromLocalStorage: (state) => {
      // FIX: Ensure Redux loads user from localStorage correctly
      const user = localStorage.getItem("user");
      state.user = user ? JSON.parse(user) : null;
    },
  },
});

export const { setUser, removeUser, setUserFromLocalStorage } = authSlice.actions;
export default authSlice.reducer;