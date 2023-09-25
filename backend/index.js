const express = require("express");
require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
const workoutRoutes = require("./routes/workoutRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/workouts", workoutRoutes);
app.use("/api/user", userRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(
        `Data base connected and server running on port: ${process.env.PORT}`
      );
    });
  })
  .catch((error) => {
    console.log(`Error: ${error}`);
  });
