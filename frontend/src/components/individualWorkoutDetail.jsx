import React, { useEffect } from "react";
import WorkoutForm from "./workoutForm";
import { getSingleWorkout } from "../hooks/getSingleWorkout";
import { useParams } from "react-router-dom";
import { deleteWorkoutHook } from "../hooks/deleteWorkout";

function IndividualWorkoutDetails() {
  const { workout, fetchData, setWorkout } = getSingleWorkout();
  const { id } = useParams();
  const { handleDeleteData, error } = deleteWorkoutHook();

  useEffect(() => {
    fetchData(id);
  }, []);

  const handleDelete = () => {
    handleDeleteData(id);
  };

  return (
    <>
      <div className="workout-details">
        <div className="flex-div">
          <h4>{workout?.title}</h4>
          <button className="dlt-btn" onClick={handleDelete}>
            Delete
          </button>
        </div>
        <p>
          <strong>Load (kg):</strong> {workout?.load}
        </p>
        <p>
          <strong>ID:</strong> {workout?._id}
        </p>
        <p>
          <strong>Reps:</strong> {workout?.reps}
        </p>
        <p>
          <strong>Created At:</strong> {workout?.createdAt}
        </p>
      </div>

      {error && <div className="error">{error}</div>}

      <WorkoutForm fetchData={fetchData(id)} />
    </>
  );
}

export default IndividualWorkoutDetails;
