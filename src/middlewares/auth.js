import jwt from "jsonwebtoken";
import { SECRET } from "../config";

export const isAuthenticate = (req, res, next) => {
  if (
    req.hasOwnProperty("headers") &&
    req.headers.hasOwnProperty("authorization")
  ) {
    try {
      req.user = jwt.verify(req.headers["authorization"], SECRET);
    } catch (err) {
      return res.status(401).json({
        message: "Failed to authenticate token"
      });
    }
  } else {
    return res.status(401).json({
      message: "No token provided"
    });
  }
  next();
  return;
};
