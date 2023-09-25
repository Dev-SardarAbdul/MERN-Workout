import { useState } from "react";
import { useSelector } from "react-redux";

export const updateWorkoutHook = () => {
  const [updateError, setUpdateError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.user);

  const handleUpdateWorkout = async (
    id,
    title,
    load,
    reps,
    setTitle,
    setReps,
    setLoad,
    fetchData
  ) => {
    setLoading(true);
    const response = await fetch(`http://localhost:5000/api/workouts/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ title, reps, load }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    const data = await response.json();

    console.log(data);

    if (!response.ok) {
      setUpdateError(data.error);
      setLoading(false);
    }

    if (response.ok) {
      setUpdateError(null);
      setLoading(false);

      fetchData;
      setTitle("");
      setLoad("");
      setReps("");
      alert("Workout Updated Successfully");
    }
  };

  return { updateError, handleUpdateWorkout, loading };
};
