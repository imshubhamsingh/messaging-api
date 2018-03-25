import { Router } from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import User from "../models/user";

import { SALT } from "../config";
import { isAuthenticate } from "../middlewares/auth";

export default ({ config, db }) => {
  let block = Router();

  block.post("/:username", isAuthenticate, async (req, res) => {
    let blockedUser = await User.findOne({
      username: req.params.username
    });
    let user = await User.findOne({
      username: req.user.username
    });

    if (!blockedUser || !user) {
      return res.status(401).json({
        message: "No such user exists"
      });
    }

    if (user.blockUser(blockedUser.username)) {
      res.json({
        message: "User Blocked successfully"
      });
    } else {
      res.json({
        message: "User is already in you block list"
      });
    }
  });

  return block;
};
