import { Router } from "express";
import { checkAuth } from "../utils/checkAuth.js";
import User from "../models/User.js";
import Message from "../models/Message.js";

const router = Router();

router.post("/messages/", checkAuth, async (req, res) => {
  const user = req.userId;

  const receiver = req.body.receiver;

  const findReceiver = await User.findById(receiver).catch(() => null);

  if (!findReceiver) {
    return res.json({
      message: "Receiver not found",
    });
  }

  const message = req.body.message;

  if (!message) {
    return res.json({
      message: "Message not be empty",
    });
  }

  try {
    await Message.create({
      content: message,
      receiver,
      sender: user,
    });

    return res.status(204).end();
  } catch (error) {
    console.error(error);

    return res.status(500).json(error);
  }
});

router.get("/messages/", checkAuth, async (req, res) => {
  const user = req.userId;

  const receiver = req.query.receiver;

  const findReceiver = await User.findById(receiver);

  if (!findReceiver) {
    return res.json({
      message: "Receiver not found",
    });
  }

  try {
    const response = await Message.find({
      $or: [
        { receiver, sender: user },
        { receiver: user, sender: receiver },
      ],
    }).sort({ timestamp: 1 });

    return res.json({
      messages: response,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json(error);
  }
});

export default router;
