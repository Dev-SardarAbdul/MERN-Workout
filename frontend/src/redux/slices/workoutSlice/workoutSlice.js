import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  workouts: [],
};

const workoutSlice = createSlice({
  name: "workout",
  initialState,
  reducers: {
    setWorkouts: (state, action) => {
      state.workouts = action.payload;
    },

    createWorkout: (state, action) => {
      state.workouts.unshift(action.payload);
    },
    deleteWorkout: (state, action) => {
      const { _id } = action.payload;
      state.workouts = state.workouts.filter((workout) => workout._id !== _id);
    },
    clearWorkouts: (state) => {
      state.workouts = null;
    },
  },
});

export const { setWorkouts, createWorkout, deleteWorkout, clearWorkouts } =
  workoutSlice.actions;

export default workoutSlice.reducer;
