import { createWorkout } from "../redux/slices/workoutSlice/workoutSlice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export const createWorkoutHook = () => {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const handleCreateWorkout = async ({
    title,
    load,
    reps,
    setLoad,
    setTitle,
    setReps,
  }) => {
    const response = await fetch("http://localhost:5000/api/workouts", {
      method: "POST",
      body: JSON.stringify({ title, load, reps }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.error);
    }

    if (response.ok) {
      setTitle("");
      setLoad("");
      setReps("");
      setError(null);
      dispatch(createWorkout(data));
    }
  };

  return { error, handleCreateWorkout };
};
