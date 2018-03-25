import { Router } from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import User from "../models/user";

import { SALT } from "../config";

export default ({ config, db }) => {
  let register = Router();

  register.post("/", (req, res) => {
    let newUser = new User(req.body);
    console.log(req.body);
    newUser.hashPassword = bcrypt.hashSync(req.body.password, parseInt(SALT));
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

  return register;
};
