import React from "react";
import { useNavigate } from "react-router-dom";

function WorkoutDetails({ workout }) {
  const navigate = useNavigate();

  return (
    <div
      className="workout-details"
      onClick={() => navigate(`/workout-detail/${workout._id}`)}
      style={{ cursor: "pointer" }}
    >
      <h4>{workout.title}</h4>
      <p>
        <strong>Load (kg):</strong> {workout.load}
      </p>
      <p>
        <strong>Reps:</strong> {workout.reps}
      </p>
      <p>{workout.createdAt}</p>
    </div>
  );
}

export default WorkoutDetails;
