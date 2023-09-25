const Workout = require("../models/workoutModel");
const mongoose = require("mongoose");

const getAllWorkouts = async (req, res) => {
  const user_id = req.user._id;

  const workout = await Workout.find({ user_id }).sort({ createdAt: -1 });

  res.status(200).json(workout);
};

const getSingleWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "ObjectId is not valid" });
  }

  try {
    const workout = await Workout.findById(id);

    if (!workout) {
      return res.status(400).json({ error: "No Workout With This ID" });
    }

    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: "Couldn't find this workout" });
  }
};

const createWorkout = async (req, res) => {
  const { title, load, reps } = req.body;
  const user_id = req.user._id;

  if (!title || !load || !reps) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const workout = await Workout.create({ title, load, reps, user_id });
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: "Failed to create workout" });
  }
};

const deleteWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Not a valid id" });
  }

  const workout = await Workout.findByIdAndDelete({ _id: id });
  res.status(200).json(workout);
};

const updateWorkout = async (req, res) => {
  const { id } = req.params;
  const { title, load, reps } = req.body;

  if (!title || !load || !reps) {
    return res.status(400).json({ error: "All fields are required" });
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Id not valid" });
  }

  try {
    const workout = await Workout.findByIdAndUpdate(
      { _id: id },
      {
        title,
        load,
        reps,
      }
    );
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: "Failed to update workout" });
  }
};

module.exports = {
  getAllWorkouts,
  getSingleWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout,
};
