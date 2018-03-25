import { Router } from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import Message from "../models/message";

import { SALT } from "../config";
import { isAuthenticate } from "../middlewares/auth";
import { standardizeMessages } from "../utils/messageUtils";

export default ({ config, db }) => {
  let inbox = Router();

  inbox.get("/", isAuthenticate, async (req, res) => {
    let messages = await Message.find({
      to: req.user.username
    });
    res.json(standardizeMessages(messages));
  });

  return inbox;
};
