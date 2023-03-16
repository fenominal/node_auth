// User model schema file.//

import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  userEmail: {
    type: String,
    require: true,
  },
  userFullName: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  cpassword: {
    type: String,
    require: true,
  },
  userMobile: {
    type: Number,
    require: true,
  },
  userBio: {
    type: String,
  },
  userRole: {
    type: String,
  },
});

export default mongoose.model("USER", userSchema);