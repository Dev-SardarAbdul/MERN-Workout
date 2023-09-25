import { useDispatch, useSelector } from "react-redux";
import { setWorkouts } from "../redux/slices/workoutSlice/workoutSlice";

export const getWorkOutsHook = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const fetchData = async () => {
    const response = await fetch("http://localhost:5000/api/workouts", {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const data = await response.json();

    if (response.ok) {
      dispatch(setWorkouts(data));
    }
  };

  return { fetchData };
};
