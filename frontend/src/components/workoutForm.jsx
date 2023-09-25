import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { createWorkoutHook } from "../hooks/createWorkoutsHook";
import { updateWorkoutHook } from "../hooks/updateWorkoutHook";
import { useParams } from "react-router-dom";
import Loader from "./loader";

function WorkoutForm({ fetchData }) {
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const location = useLocation();
  const { id } = useParams();

  const { error, handleCreateWorkout } = createWorkoutHook();
  const { updateError, handleUpdateWorkout, loading } = updateWorkoutHook();

  const handleSubmit = (e) => {
    e.preventDefault();
    handleCreateWorkout({ title, load, reps, setTitle, setLoad, setReps });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    handleUpdateWorkout(
      id,
      title,
      load,
      reps,
      setTitle,
      setLoad,
      setReps,
      fetchData
    );
  };

  return (
    <>
      {loading && <Loader />}
      <form
        className="create"
        onSubmit={location.pathname === "/" ? handleSubmit : handleUpdate}
      >
        <h3>
          {location.pathname === "/"
            ? " Create A New Workout"
            : " Update Workout"}
        </h3>

        <label>Exercise Name:</label>
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />

        <label>Load (KG):</label>
        <input
          type="number"
          onChange={(e) => setLoad(e.target.value)}
          value={load}
        />

        <label>Reps</label>
        <input
          type="number"
          onChange={(e) => setReps(e.target.value)}
          value={reps}
        />
        {location.pathname === "/" ? (
          <button>Add Workout</button>
        ) : (
          <button>Update Workout</button>
        )}
        {(error || updateError) && (
          <div className="error">{error || updateError}</div>
        )}
      </form>
    </>
  );
}

export default WorkoutForm;
