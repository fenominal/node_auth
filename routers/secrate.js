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

router.get("/get", auth, getSelfData);

router.get("/getAllUserData", auth, getAllUserData);

router.post("/Bio", auth, addBio);

router.patch("/updatePassword", auth, selfPassword);

router.patch("/profile", auth, profileUpdate);

router.patch("/updateEmail", auth, updateEmail);

router.delete("/deleteBio", auth, deleteBio);

// router,get("self");

export default router;
