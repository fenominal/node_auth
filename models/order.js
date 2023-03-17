// Order model schema file.//

import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
  orderType: {
    type: String,
    enum: ["Online", "COD", "Other"], // Store onlye diffine value..
    require: true,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId, // it make filed type as objectid
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId, // it make filed type as objectid
  },
  orderQuntity:{
    type:Number,
    require:true,
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("ORDER", orderSchema);
