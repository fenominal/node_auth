// Platform collection schema. //

import mongoose from "mongoose";

const platformSchema = new mongoose.Schema({
  platformName: {
    type: String,
    enum: ["FaceBook", "Instagram","Twitter"],// Store onlye diffine value..
    require: true,
  },
});

export default mongoose.model("PLATFORM", platformSchema);
