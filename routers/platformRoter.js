// platform router file...
import express from "express";

import auth from "../middleware/auth.js";
import {
  inserPlaftformintoprodcut,
  insertplatfrom,
  getAllPlatform,
  updatePlatform,
  deletePlatfrom,
} from "../controller/platformController.js";

const router = express.Router();

router.post("/insertPlatforminprodcut", auth, inserPlaftformintoprodcut); // prodcut router for insert platfrom in it...

// Platfrom Collection router.
router.post("/insertPlatform", auth, insertplatfrom);
router.get("/getallPlatform", auth, getAllPlatform);
router.patch("/updatePlatfrom", auth, updatePlatform);
router.delete("/deletePlatfrom", auth, deletePlatfrom);

export default router;
