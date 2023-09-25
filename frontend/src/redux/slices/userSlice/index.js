import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.user = action.payload;
    },
    signoutUser: (state, action) => {
      state.user = null;
    },
  },
});

export const { loginUser, signoutUser } = userSlice.actions;

export default userSlice.reducer;
