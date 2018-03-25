import mongoose from "mongoose";

const Schema = mongoose.Schema;

//= ===============================
// Message Schema
//= ===============================

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
  },
  sendTime: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Message", MessageSchema);
