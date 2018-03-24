import { Router } from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import User from "../models/user";

import { SECRET } from "../config";

export default ({ config, db }) => {
  let message = Router();

  message.post("/", (req, res) => {
    User.findOne(
      {
        username: req.body.username
      },
      (err, user) => {
        if (err) throw err;
        if (!user || !user.comparePassword(req.body.password)) {
          return res.status(401).json({
            message: "Authentication failed. Invalid user or password."
          });
        }
        return res.json({
          token: jwt.sign(
            {
              username: user.username,
              fullName: `${user.firstName} ${user.lastName}`,
              _id: user._id
            },
            SECRET
          )
        });
      }
    );
  });

  return message;
};
