// Order Router File...

import express from "express";

import auth from "../middleware/auth.js";

import {
  orderProduct,
  deleteProdcut,
  getAllOrder,
  updateOrder,
  getOneOrderDetails,
} from "../controller/orderController.js";

const router = express.Router();

// Routers...

router.post("/orderProdcut", auth, orderProduct);
router.delete("/cancelOrder", auth, deleteProdcut);
router.patch("/updateOrder", auth, updateOrder);
router.get("/allOrder", auth, getAllOrder);
router.get("/getOneOrder",auth,getOneOrderDetails);

export default router;
