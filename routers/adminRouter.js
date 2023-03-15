import express, { Router } from "express";

import auth from "../middleware/auth.js";
import { verifyAdmin } from "../middleware/verifyRole.js";

import {
  getOneUserProdcut,
  allUserWithProdcut,
  getUserFromProdut,
  getAllProdcutDetails,
  getUserProdcutPlatfrom,
  getoneUserprodcutplatform,
} from "../controller/aggregation.js";

import { updateRole } from "../controller/adminController.js";

const router = express.Router();

// It uncomment whene user access requierd.
//aggregationRouter and Admin APIs for prodcut aggregation...
// router.get("/getUserProdcut", auth, verifyAdmin, getOneUserProdcut);
// router.get("/getAll", auth, verifyAdmin, allUserWithProdcut);
// router.get("/getProdcutUser", auth, verifyAdmin, getUserFromProdut);
// router.get("/allProdcutDetails", auth, verifyAdmin, getAllProdcutDetails);
// Admin Update other user APIs.....
// router.patch("/updateUser", auth, verifyAdmin, updateRole);

router.get("/getUserProdcut", auth, getOneUserProdcut);
router.get("/getAll", auth, allUserWithProdcut);
router.get("/getProdcutUser", auth, getUserFromProdut);
router.get("/allProdcutDetails", auth, getAllProdcutDetails);

router.get("/alluserprodcutplatform", auth, getUserProdcutPlatfrom);
router.get("/oneuserprodcutplatform", auth, getoneUserprodcutplatform);
export default router;
