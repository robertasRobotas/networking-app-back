import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRoute from "./routes/user.js";
import eventRoute from "./routes/event.js";

import "dotenv/config";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/users", userRoute);
app.use("/events", eventRoute);

mongoose
  .connect(process.env.DB_CONNECTION)
  .then(() => console.log("CONNECTED!!!"))
  .catch((err) => {
    console.log(err);
  });

app.listen(3000, () => {
  console.log("App started");
});
