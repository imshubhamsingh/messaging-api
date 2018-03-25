import { Router } from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import Message from "../models/message";

import { SALT } from "../config";
import { isAuthenticate } from "../middlewares/auth";

export default ({ config, db }) => {
  let message = Router();

  message.get("/", isAuthenticate, async (req, res) => {
    let messages = await Message.find({
      to: req.user.username
    });
    res.json([...messages]);
  });

  return message;
};
