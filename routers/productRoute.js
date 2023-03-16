// Prodcut Router File .//

import express, { Router } from "express";

import {
  insertProdcut,
  getSelfProdcut,
  getSelfOnProdcut,
  deletSelfProdcut,
  updateSelfProdcut,
} from "../controller/prodcutController.js";

import { insetWithService, insertUser } from "../controller/demoController.js"; // demo testing router...

import auth from "../middleware/auth.js";
import { verifyAdmin } from "../middleware/verifyRole.js";

const router = express.Router();

router.post("/insertPordcut", auth, insertProdcut);
router.delete("/deleteProdcut", auth, deletSelfProdcut);
router.patch("/updateProdcut", auth, updateSelfProdcut);

// testing Router controller.
router.get("/getprodcuWithService", auth, insetWithService);
router.post("/testInsert", insertUser);

// this api not requierd now...
router.get("/getAllProdcut", auth, getSelfProdcut);
router.get("/getprodcut", auth, getSelfOnProdcut);

export default router;
