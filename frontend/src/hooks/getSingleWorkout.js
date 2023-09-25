import { useState } from "react";
import { useSelector } from "react-redux";

export const getSingleWorkout = () => {
  const [workout, setWorkout] = useState();
  const { user } = useSelector((state) => state.user);

  const fetchData = async (id) => {
    const response = await fetch(`http://localhost:5000/api/workouts/${id}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const data = await response.json();

    if (response.ok) {
      setWorkout(data);
    }
  };

  return { workout, fetchData, setWorkout };
};
