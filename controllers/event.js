import EventModel from "../models/event.js";
import mongoose from "mongoose";

const CREATE_EVENT = async (req, res) => {
  const event = new EventModel({
    title: req.body.title,
    description: req.body.description,
    date: req.body.date,
    time: req.body.time,
    visitors: req.body.visitors,
  });

  const response = await event.save();

  return res.status(201).json({ response: response });
};

const GET_ALL_EVENTS = async (req, res) => {
  try {
    const events = await EventModel.find();
    return res.status(201).json({ events: events });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "something went wrong" });
  }
};

const GET_EVENT_BY_ID = async (req, res) => {
  try {
    const events = await EventModel.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "visitors",
          foreignField: "id",
          as: "event_visitors",
        },
      },
      { $match: { _id: new mongoose.Types.ObjectId(req.params.id) } },
    ]);

    return res.status(200).json({ events: events });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "something went wrong" });
  }
};

const UPDATE_EVENT = async (req, res) => {
  try {
    const event = await EventModel.updateOne(
      { _id: req.params.id },
      {
        ...req.body,
      }
    );

    return res.status(200).json({ event: event });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "something went wrong" });
  }
};

const DELETE_EVENT = async (req, res) => {
  try {
    const event = await EventModel.deleteOne({ _id: req.params.id });

    return res.status(200).json({ event: event });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "something went wrong" });
  }
};

const JOIN_EVENT = async (req, res) => {
  try {
    const event = await EventModel.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "event does not exist" });
    }

    EventModel.updateOne(
      { _id: event._id },
      { $push: { visitors: req.body.userId } }
    ).exec();

    res.status(200).json({ message: "You have joined event" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "something went wrong" });
  }
};

export {
  CREATE_EVENT,
  JOIN_EVENT,
  GET_ALL_EVENTS,
  GET_EVENT_BY_ID,
  UPDATE_EVENT,
  DELETE_EVENT,
};
