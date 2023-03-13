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

const router = express.Router();

router.post("/insertPordcut", auth, insertProdcut);

router.get("/getAllProdcut", auth, getSelfProdcut);

router.get("/getprodcut", auth, getSelfOnProdcut);

router.delete("/deleteProdcut", auth, deletSelfProdcut);

router.patch("/updateProdcut/:ID", auth, updateSelfProdcut);

// testing Router controller.
router.get("/getprodcuWithService", auth, insetWithService);
router.post("/testInsert", insertUser);


//aggregationRouter
router.get("/getUserProdcut", auth, getOneUserProdcut);
router.get("/getAll", auth, allUserWithProdcut);
router.get("/getProdcutUser", auth, getUserFromProdut);
router.get("/allProdcutDetails", auth, getAllProdcutDetails);

export default router;
