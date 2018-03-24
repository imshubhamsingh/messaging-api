import { Router } from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import User from "../models/user";

import { SALT } from "../config";

export default ({ config, db }) => {
  let message = Router();

  message.post("/", (req, res) => {
    let newUser = new User(req.body);
    newUser.hashPassword = bcrypt.hashSync(req.body.password, SALT);
    newUser.save((err, user) => {
      if (err) {
        return res.status(400).send({
          message: err
        });
      } else {
        user.hash_password = undefined;
        return res.json({
          message: "User successfully registered"
        });
      }
    });
  });

  return message;
};
