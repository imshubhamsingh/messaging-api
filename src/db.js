import mongoose from "mongoose";
import { MONGOURL } from "./config";

export default callback => {
  let db = mongoose.connect(MONGOURL, { useMongoClient: true });
  callback(db);
};
