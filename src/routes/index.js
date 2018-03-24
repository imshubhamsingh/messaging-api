import { Router } from "express";
import initializeDB from "../db";
import middleware from "../middlewares";
import strategies from "../strategies";

import login from "../controllers/login";
import register from "../controllers/register";
import sendMessage from "../controllers/sendMessage";
import inbox from "../controllers/inbox";
import block from "../controllers/block";

let router = Router();

initializeDB(db => {
  let config = {};

  // middlewareS
  router.use(middleware({ config, db }));
  router.use(strategies(passport));
  //api route v1 (/v1)
  router.use("/login", login({ config, db }));
  router.use("/register", register({ config, db }));
  router.use("/sendMessage", sendMessage({ config, db }));
  router.use("/inbox", inbox({ config, db }));
  router.use("/block", block({ config, db }));
});

export default router;
