import { Router } from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import User from "../models/user";

import { SALT } from "../config";

export default ({ config, db }) => {
  let message = Router();

  message.post("/", (req, res) => {
    let newUser = new User(req.body);
    console.log(SALT);
    newUser.hashPassword = bcrypt.hashSync(req.body.password, parseInt(SALT));
    console.log(newUser.hashPassword);
    newUser.save((err, user) => {
      if (err) {
        return res.status(400).send({
          message: err
        });
      } else {
        user.hashPassword = undefined;
        return res.json({
          message: "User successfully registered"
        });
      }
    });
  });

  return message;
};
