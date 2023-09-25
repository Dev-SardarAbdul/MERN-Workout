import { deleteWorkout } from "../redux/slices/workoutSlice/workoutSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const deleteWorkoutHook = () => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState(null);

  const handleDeleteData = async (id) => {
    const response = await fetch(`http://localhost:5000/api/workouts/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const data = await response.json();

    if (!response.ok) {
      setError(data.error);
    }

    if (response.ok) {
      setError(null);
      dispatch(deleteWorkout(data));
      alert("Deleted Successfully");
      navigate("/");
    }
  };

  return { error, handleDeleteData };
};
