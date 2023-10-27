import express from "express";

const router = express.Router();

router.post("/register", (req, res) => {
  console.log(req.body);

  return res.status(200).json({ status: "User registered" });
});

export default router;
