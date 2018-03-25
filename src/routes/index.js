import { Router } from "express";
import initializeDB from "../db";

import login from "../controllers/login";
import register from "../controllers/register";
import sendMessage from "../controllers/sendMessage";
import inbox from "../controllers/inbox";
import block from "../controllers/block";

let router = Router();

initializeDB(db => {
  let config = {};

  //api route v1 (/v1)
  router.use("/login", login({ config, db }));
  router.use("/register", register({ config, db }));
  router.use("/sendmessage", sendMessage({ config, db }));
  router.use("/inbox", inbox({ config, db }));
  router.use("/block", block({ config, db }));
});

export default router;
