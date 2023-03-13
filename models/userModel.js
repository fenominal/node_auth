// User model schema file.//

import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  userEmail: {
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
  userRole:{
    type:String,
  },
});

// Generating Tokens

// userSchema.methods.gerateAuthToken = async function () {
//   try {
//     let genrateToken = jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
//     this.tokens = this.tokens.concat({ token: genrateToken });
//     await this.save();
//     return genrateToken;
//   } catch (error) {
//     console.log(error);
//   }
// };

export default mongoose.model("USER", userSchema);
