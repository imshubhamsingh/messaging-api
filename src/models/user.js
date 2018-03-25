import mongoose from "mongoose";
import bcrypt from "bcrypt";

import uniqueValidator from "mongoose-unique-validator";

const Schema = mongoose.Schema;

//= ===============================
// User Schema
//= ===============================

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

// Apply the uniqueValidator plugin to userSchema.
UserSchema.plugin(uniqueValidator);

//= ===============================
// User model methods
//= ===============================

// Method to compare password for login
UserSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.hashPassword);
};

// Method to block other users
UserSchema.methods.blockUser = function(username) {
  if (!this.blockedUser.includes(username)) {
    this.blockedUser.push(username);
    return true;
  } else {
    return false;
  }
};

export default mongoose.model("User", UserSchema);
