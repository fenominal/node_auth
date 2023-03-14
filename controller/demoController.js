// testing Controller.....

import prodcutModel from "../models/prodcutModel.js";
import validator from "validator";
import passwordValidator from "password-validator";
import bcrypt from "bcryptjs";

import {
  getUserProduct,
  inserIntoUser,
  encrypt_value,checkEmptyemail,
} from "../service/getUserProdcut.js";
import users from "../models/userModel.js";

// Password Schema
var PasswordCheckSchema = new passwordValidator()
  .lowercase()
  .uppercase()
  .digits()
  .symbols()
  .is()
  .max(15)
  .is()
  .min(8);

/**
 * Controller Function for Inster Prodcut.
 * @author Patel Ayush
 * @param (request and response)
 */
export const insetWithService = async (req, res) => {
  console.log("Controler...");
  const { id: _id } = req.user;
  // console.log(_id);
  try {
    const getData = await getUserProduct(_id);
    res.status(200).json(getData);
    // console.log(getData);
  } catch (error) {
    res.status(404).json(error);
    console.log(error);
  }
};

export const insertUser = async (req, res) => {
  try {
    //GET DATA FROM BODY.
    const { email, password, conform_password, mobile } = req.body;

    const CheckPhoneReger = /^[6-9]\d{9}$/gi; // Phone Number Reger define local in Function.
    const valid_phone = await CheckPhoneReger.test(mobile);
    const valid_email = validator.isEmail(email);
    const valid_password = PasswordCheckSchema.validate(password);

    // const empty_check= await checkEmptyemail(email);

    if (!email && !password && !conform_password && !mobile) {
      res.status(500).json({
        status: "Fail",
        message: process.env.EMPTY_SIGNUP_ALL,
      });
    } else if (!email) {
      res
        .status(500)
        .json({ status: "Fail", message: process.env.EMPTY_EMAIL });
    } else if (!password) {
      res
        .status(500)
        .json({ status: "Fail", message: process.env.EMPTY_PASSWORD });
    } else if (!conform_password) {
      res.status(500).json({
        status: "Fail",
        message: process.env.EMPTY_CONFORM_PASSWORD,
      });
    } else if (!mobile) {
      res.status(500).json({
        status: "Fail",
        message: process.env.EMPTY_CONFORM_MOBILE,
      });
    } else if (!(typeof mobile == "number")) {
      res.status(500).json({
        status: "Fail",
        message: process.env.NOT_ANUMBER_PHONE,
      });
    } else {
      const existinguser = await users.findOne({ userEmail: email });
      const existinguserPhone = await users.find({ userMobile: mobile });
      if (valid_email) {
        if (!existinguser) {
          if (Object.keys(existinguserPhone).length === 0) {
            if (valid_password) {
              if (password == conform_password) {
                if (valid_phone) {
                  const hashedPassword = await encrypt_value(password);
                  const hashedCPassword = await encrypt_value(conform_password);

                  const getData = await inserIntoUser(
                    email,
                    hashedPassword,
                    hashedCPassword,
                    mobile
                  );
                  res.status(200).send({
                    status: "Success",
                    Message: process.env.SIGNIN_SUCCESS,
                  });
                } else {
                  return res.status(400).json({
                    status: "Fail",
                    Message: process.env.INVALID_PHONE,
                  });
                }
              } else {
                return res.status(400).json({
                  status: "Fail",
                  Message: process.env.PASS_CPASS_MISSMATCH,
                });
              }
            } else {
              return res.status(400).json({
                status: "Fail",
                Message: process.env.INVALID_PASSWORD,
              });
            }
          } else {
            res.status(500).json({
              status: "Fail",
              message: process.env.NUMBER_EXISTE,
            });
          }
        } else {
          return res
            .status(400)
            .json({ status: "Fail", Message: process.env.USER_EXISTE });
        }
      } else {
        return res
          .status(400)
          .json({ status: "Fail", Message: process.env.INVADLI_EMAIL });
      }
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ status: "Fail", Message: process.env.SWW, Error: error });
  }
};
