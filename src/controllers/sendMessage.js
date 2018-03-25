import { Router } from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import Message from "../models/message";

import { SALT } from "../config";
import { isAuthenticate } from "../middlewares/auth";

export default ({ config, db }) => {
  let message = Router();

  message.post("/", isAuthenticate, (req, res) => {
    let newMessage = new Message(req.body);
    newMessage.from = req.user.username;
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
  });

  return message;
};
