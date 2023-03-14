// platform router file...
import express from "express";

import auth from "../middleware/auth.js";
import {
  inserPlaftformintoprodcut,
  insertplatfrom,
} from "../controller/platformController.js";

const router = express.Router();

router.post("/insertPlatforminprodcut", auth, inserPlaftformintoprodcut);

router.post("/insertPlatform", auth, insertplatfrom);

export default router;
