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

import {
  getOneUserProdcut,
  allUserWithProdcut,
  getUserFromProdut,
  getAllProdcutDetails,
} from "../controller/getUserProdcut.js";

import auth from "../middleware/auth.js";
import { verifyAdmin } from "../middleware/verifyRole.js";

const router = express.Router();

router.post("/insertPordcut", auth, insertProdcut);

router.get("/getAllProdcut", auth, getSelfProdcut);

router.get("/getprodcut", auth, getSelfOnProdcut);

router.delete("/deleteProdcut", auth, deletSelfProdcut);

router.patch("/updateProdcut", auth, updateSelfProdcut);

// testing Router controller.
router.get("/getprodcuWithService", auth, insetWithService);
router.post("/testInsert", insertUser);

//aggregationRouter and Admin Apis
router.get("/getUserProdcut", auth, getOneUserProdcut);
router.get("/getAll", auth, verifyAdmin, allUserWithProdcut);
router.get("/getProdcutUser", auth, verifyAdmin, getUserFromProdut);
router.get("/allProdcutDetails", auth, verifyAdmin, getAllProdcutDetails);

export default router;
