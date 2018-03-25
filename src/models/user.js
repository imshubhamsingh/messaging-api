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
  blockedUser: {
    type: Array,
    default: []
  },
  created: {
    type: Date,
    default: Date.now
  }
});

UserSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.hashPassword);
};

UserSchema.method.blockUser = function(username) {
  if (!this.blockedUser.find(username)) {
    this.blockedUser.push(username);
    return true;
  } else {
    return false;
  }
};

export default mongoose.model("User", UserSchema);
