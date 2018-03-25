import mongoose from "mongoose";

const Schema = mongoose.Schema;

let MessageSchema = new Schema({
  from: {
    type: String,
    trim: true,
    required: true
  },
  to: {
    type: String,
    trim: true,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  message: {
    type: String,
    trim: true,
    required: true
  }
});

export default mongoose.model("Message", MessageSchema);
