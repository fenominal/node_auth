// Services file for work with produt model //

import bcrypt from "bcryptjs";

import prodcutModel from "../models/prodcutModel.js";
import users from "../models/userModel.js";

/**
 * Service Function For Get Prodcut.
 * @author Patel Ayush
 * @param (request and response)
 */
export const getUserProduct = async (_id) => {
  console.log("======= Get User Prodcut Services. =========");
  const prodcutbySelf = await prodcutModel.find({ userId: _id });
  return prodcutbySelf;
};

// insert Into user collection services...
export const inserIntoUser = async (
  email,
  hashedPassword,
  hashedCPassword,
  mobile
) => {
  console.log("======= Insert In To Services. =========");
  const newUser = await users.create({
    userEmail: email,
    cpassword: hashedCPassword,
    password: hashedPassword,
    userMobile: mobile,
  });
  return newUser;
};

/**
 * Service function For Encrypt value.
 * @author Patel Ayush
 * @param {String} value
 * @returns {hasedvalue}
 */
export const encrypt_value = async (value) => {
  const hasedvalue = await bcrypt.hash(value, 12);
  return hasedvalue;
};

/**
 * Service for check empty value.
 * @author Patel Ayush
 * @param {String} email
 * @returns {}
 */
export const checkEmptyemail = async (email) => {
 
};
