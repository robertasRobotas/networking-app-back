import EventModel from "../models/event.js";

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

export { CREATE_EVENT, JOIN_EVENT };
