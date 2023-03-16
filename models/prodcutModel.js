// Prodcut collection schema file.//

import mongoose from "mongoose";

const pordocutSchema = new mongoose.Schema({
  prodcutName: {
    type: String,
    require: true,
  },
  prodcutType: {
    type: String,
    require: true,
  },
  prodcutQuentity: {
    type: Number,
    require: true,
  },
  // platformName: [
  //   {
  //     platform: {
  //       type: String,
  //       enum: ["FaceBook", "Instagram", "Twitter"], 
  //       require: true,
  //     },
  //   },
  // ],
  platformName: {
    type: String,
    enum: ["FaceBook", "Instagram", "Twitter","FB","Insta"], // Store only diffine value..
    require: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId, // it make filed type as objectid
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("PRODCUT", pordocutSchema);
