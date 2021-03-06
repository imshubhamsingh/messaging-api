import { Router } from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import Message from "../models/message";
import User from "../models/user";

import { SALT } from "../config";
import { isAuthenticate } from "../middlewares/auth";

export default ({ config, db }) => {
  let message = Router();

  message.post("/", isAuthenticate, async (req, res) => {
    let newMessage = new Message(req.body);
    newMessage.from = req.user.username;

    let user = await User.findOne({
      username: req.user.username
    });

    let receiverUser = await User.findOne({
      username: req.body.to
    });

    if (!receiverUser) {
      return res.status(404).json({
        message: "No such User"
      });
    }
    if (!receiverUser.blockedUser.includes(req.user.username)) {
      newMessage.save((err, msg) => {
        if (err) {
          return res.status(400).send({
            message: err
          });
        } else {
          return res.json({
            message: "Message successfully send"
          });
        }
      });
    } else {
      return res.status(550).json({
        message: "Cannot send message as you are blocked"
      });
    }
  });

  return message;
};
