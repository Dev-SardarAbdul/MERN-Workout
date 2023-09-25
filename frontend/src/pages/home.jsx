import { useEffect } from "react";
import React from "react";
import WorkoutForm from "../components/workoutForm";
import { useSelector } from "react-redux";
import { getWorkOutsHook } from "../hooks/getWorkoutsHook";
import WorkoutDetails from "../components/workoutDetails";

function Home() {
  const { workouts } = useSelector((state) => state.workout);
  const { fetchData } = getWorkOutsHook();

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="home">
      <div className="workouts">
        {workouts &&
          workouts.map((workout) => (
            <WorkoutDetails key={workout._id} workout={workout} />
          ))}

        {!workouts || (workouts?.length == 0 && <>No Data Found</>)}
      </div>
      <WorkoutForm />
    </div>
  );
}

export default Home;
