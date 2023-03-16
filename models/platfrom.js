// Platform collection schema. //

import mongoose from "mongoose";

const platformSchema = new mongoose.Schema({
  platformName: {
    type: String,
    enum: ["FaceBook", "Instagram", "Twitter"], // Store onlye diffine value..
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

export default mongoose.model("PLATFORM", platformSchema);
