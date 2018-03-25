import mongoose from "mongoose";
import { MONGOURL } from "./config";

mongoose.Promise = Promise;

export default callback => {
  let db = mongoose.connect(MONGOURL, (err, res) => {
    if (err) {
      console.log("ERROR connecting to: " + MONGOURL + ". " + err);
    } else {
      console.log("Successfully connected to: " + MONGOURL);
    }
  });
  callback(db);
};
