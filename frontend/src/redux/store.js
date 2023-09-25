import { configureStore } from "@reduxjs/toolkit";
import workoutSlice from "./slices/workoutSlice/workoutSlice";
import userSlice from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    workout: workoutSlice,
    user: userSlice,
  },
});
