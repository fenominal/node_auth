// platform router file...
import express from "express";

import auth from "../middleware/auth.js";
import {
  inserPlaftformintoprodcut,
  insertplatfrom,
  getAllPlatform,
  updatePlatform,
  deletePlatfrom,
  getOnePlatform,
} from "../controller/platformController.js";

const router = express.Router();

router.post("/insertPlatforminprodcut", auth, inserPlaftformintoprodcut); // prodcut router for insert platfrom in it...

// Platfrom Collection router.
router.post("/insertPlatform", auth, insertplatfrom);
router.patch("/updatePlatfrom", auth, updatePlatform);
router.delete("/deletePlatfrom", auth, deletePlatfrom);

// This api not requierd now.......
router.get("/getallPlatform", auth, getAllPlatform);
router.get("/getOneplatfrom",auth,getOnePlatform);

export default router;
