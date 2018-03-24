import mongoose from "mongoose";
import bcrypt from "bcrypt";

const Schema = mongoose.Schema;

let UserSchema = new Schema({
  firstName: {
    type: String,
    trim: true,
    required: true
  },
  lastName: {
    type: String,
    trim: true,
    required: true
  },
  username: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    required: true
  },
  hashPassword: {
    type: String
  },
  created: {
    type: Date,
    default: Date.now
  }
});

UserSchema.methods.comparePassword = password =>
  bcrypt.compareSync(password, this.hash_password);

export default mongoose.model("User", UserSchema);
