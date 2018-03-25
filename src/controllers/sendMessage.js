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
      res.json({
        message: "No such User"
      });
    }
    if (!user.blockedUser.includes(req.body.to)) {
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
      return res.json({
        message: "Cannot send message to blocked User"
      });
    }
  });

  return message;
};
