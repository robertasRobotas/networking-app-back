import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRoute from "./routes/user.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/users", userRoute);

mongoose
  .connect(
    "mongodb+srv://robertas123:robertas123@cluster0.vcrupfs.mongodb.net/"
  )
  .then(() => console.log("CONNECTED!!!"))
  .catch((err) => {
    console.log(err);
  });

app.listen(3000, () => {
  console.log("App started");
});
