// Order Router File...

import express from "express";

import auth from "../middleware/auth.js";

import {orderProduct} from "../controller/orderController.js";

const router = express.Router();

// Routers...

router.post("/orderProdcut",auth,orderProduct);

export default router;