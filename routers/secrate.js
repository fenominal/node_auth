// Authenticate user router file.//

import express from "express";
import auth from "../middleware/auth.js";

import {
  getSelfData,
  selfPassword,
  updateEmail,
  profileUpdate,
  getAllUserData,
  addBio,
  deleteBio,
} from "../controller/secreatController.js";

const router = express.Router();

router.patch("/updatePassword", auth, selfPassword);

router.patch("/profile", auth, profileUpdate);


// This api not requerid now....
router.post("/Bio", auth, addBio);
router.delete("/deleteBio", auth, deleteBio);
router.patch("/updateEmail", auth, updateEmail);
router.get("/getAllUserData", auth, getAllUserData);
router.get("/get", auth, getSelfData);

export default router;
