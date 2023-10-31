import express from "express";
import {
  CREATE_EVENT,
  GET_ALL_EVENTS,
  JOIN_EVENT,
  GET_EVENT_BY_ID,
  UPDATE_EVENT,
  DELETE_EVENT,
} from "../controllers/event.js";
import auth from "../middlewares/auth.js";
const router = express.Router();

router.post("/", auth, CREATE_EVENT);
router.get("/", GET_ALL_EVENTS);
router.get("/:id", GET_EVENT_BY_ID);
router.put("/:id", auth, UPDATE_EVENT);
router.delete("/:id", auth, DELETE_EVENT);

router.post("/:id/join", auth, JOIN_EVENT);

export default router;
