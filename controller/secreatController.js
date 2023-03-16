// atuthenticate user profile curd operation controller file.//

import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import validator from "validator";
import passwordValidator from "password-validator";

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
 * Controller Function Get User self Data.
 * @author Patel Ayush
 * @param {String} req
 * @param {String} res
 */
export const getSelfData = async (req, res) => {
  console.log("======== Authenticate User Self Data Controller. =========");

  const { id: _id } = req.user;
  try {
    const logUserID = req.user._id;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res
        .status(400)
        .send({ Status: "Fail", Message: "User Not Loggin..." });
    }
    const UserData = await users.findById(
      { _id: logUserID },
      { _id: 0, password: 0, cpassword: 0, __v: 0 }
    );

    res.status(200).json({ Status: "Success", Data: UserData });
  } catch (error) {
    res.status(400).json({ Status: "Fail", Message: "User Not Loggin..." });
  }
};

/**
 * Update password...
 * @author Patel Ayush
 * @param {String} req
 * @param {String} res
 */
export const selfPassword = async (req, res) => {
  console.log(
    "======== Authenticate User Reset Password Controller. =========="
  );

  const { id: _id } = req.user;
  const { password, password_confirmation } = req.body;
  const valid_password = PasswordCheckSchema.validate(password);
  const valid_cpassword = PasswordCheckSchema.validate(password_confirmation);

  if (password || password_confirmation) {
    if (password) {
      if (password_confirmation) {
        if (valid_password && valid_cpassword) {
          if (password == password_confirmation) {
            const hashedPassword = await bcrypt.hash(password, 12);
            const hashedCPassword = await bcrypt.hash(
              password_confirmation,
              12
            );
            const newUser = await users.findByIdAndUpdate(
              { _id },
              {
                $set: {
                  cpassword: hashedCPassword,
                  password: hashedPassword,
                },
              }
            );
            res.status(200).send({
              status: "Sucess",
              message: "Password Update.",
            });
          } else {
            res.status(400).send({
              status: "Fail",
              message: process.env.PASS_CPASS_MISSMATCH,
            });
          }
        } else {
          res.status(400).send({
            status: "Fail",
            message: process.env.INVALID_PASSWORD,
          });
        }
      } else {
        res.status(400).send({
          status: "Fail",
          message: process.env.EMPTY_CONFORM_PASSWORD,
        });
      }
    } else {
      res.status(400).send({
        status: "Fail",
        message: process.env.EMPTY_PASSWORD,
      });
    }
  } else {
    res.status(400).send({
      status: "Fail",
      message: "Enter Value In password, password_confirmation",
    });
  }
};

/**
 * Update Email Controler function....
 * @author Patel Ayush
 * @param {String} req
 * @param {String} res
 */
export const updateEmail = async (req, res) => {
  console.log("======= Authenticate User Update Email Controller. ==========");

  try {
    const { id: _id } = req.user;
    const { email } = req.body;
    const lowerEmail = email.toLowerCase(); // covert email in to lower case...
    const existinguser = await users.findOne({ userEmail: lowerEmail }); // check alredy user email.
    const logUserEmail = req.user.userEmail;
    const valid_email = validator.isEmail(lowerEmail);

    if (lowerEmail) {
      if (valid_email) {
        if (email != logUserEmail) {
          if (!existinguser) {
            const newUser = await users.findByIdAndUpdate(
              { _id },
              {
                $set: {
                  userEmail: lowerEmail,
                },
              }
            );
            console.log(newUser);
            res.status(400).send({
              status: "Success",
              message: "Email Updated...",
            });
          } else {
            res.status(400).send({
              status: "Fail",
              message: process.env.USER_EXISTE,
            });
          }
        } else {
          res.status(400).send({
            status: "Fail",
            message: process.env.EMAIL_USED,
          });
        }
      } else {
        res.status(400).send({
          status: "Fail",
          message: process.env.INVADLI_EMAIL,
        });
      }
    } else {
      res
        .status(400)
        .send({ status: "Fail", message: process.env.EMPTY_EMAIL });
    }
  } catch (err) {
    res.status(400).send({ status: "Fail", message: `${err}` });
  }
};

/**
 * Update Profile Controler function....
 * @author Patel Ayush
 * @param {String} req
 * @param {String} res
 */
export const profileUpdate = async (req, res) => {
  console.log("======= Authenticae User Update Profile. =========");

  try {
    const { id: _id } = req.user; // get user id from token
    const { email, fullName, mobile } = req.body; // get data from request body...
    const lowerEmail = email.toLowerCase(); // covert email in to lower case...

    // Check Validations.
    const CheckPhoneReger = /^[6-9]\d{9}$/gi; // PhoneNumber Regexepration.
    const valid_phone = CheckPhoneReger.test(mobile);
    const valid_email = validator.isEmail(lowerEmail);
    const logUserEmail = req.user.userEmail; // get email from token user.
    const logUserPhone = req.user.userMobile; //
    const existinguser = await users.findOne({ userEmail: lowerEmail }); // check alredy user email.
    const existinguserPhone = await users.find({ userMobile: mobile });

    if (!lowerEmail && !fullName && !mobile) {
      res.status(500).json({
        status: "Fail",
        message: process.env.EMPTY_LOGIN_ALL,
      });
    } else if (!lowerEmail) {
      res
        .status(500)
        .json({ status: "Fail", message: process.env.EMPTY_EMAIL });
    } else if (!fullName) {
      res.status(500).json({
        status: "Fail",
        message: process.env.EMPTY_FULLNAME,
      });
    } else if (fullName.length < 2) {
      res.status(500).json({
        status: "Fail",
        message: "Full Name Have More Than 3 Charater..",
      });
    } else if (!mobile) {
      res.status(500).json({
        status: "Fail",
        message: process.env.EMPTY_CONFORM_MOBILE,
      });
    } else if (!valid_email) {
      res
        .status(500)
        .send({ status: "Fail", message: process.env.INVADLI_EMAIL });
    } else if (!valid_phone) {
      res.status(500).send({
        status: "Fail",
        message: process.env.INVALID_PHONE,
      });
    } else if (!(typeof mobile == "number")) {
      res.status(500).json({
        status: "Fail",
        message: process.env.NOT_ANUMBER_PHONE,
      });
    } else if (lowerEmail == logUserEmail) {
      res.status(500).send({
        status: "Fail",
        message: process.env.EMAIL_USED,
      });
    } else if (logUserPhone == mobile) {
      res.status(500).send({
        status: "Fail",
        message: process.env.NUMBER_EXISTE,
      });
    } else if (existinguser) {
      res.status(500).send({
        status: "Fail",
        message: process.env.USER_EXISTE,
      });
    } else if (!(Object.keys(existinguserPhone).length === 0)) {
      res.status(500).json({
        status: "Fail",
        message: process.env.NUMBER_EXISTE,
      });
    } else {
      const updatedProfile = await users.findByIdAndUpdate(
        _id,
        {
          $set: {
            userEmail: lowerEmail,
            userFullName: fullName,
            userMobile: mobile,
          },
        },
        { new: true }
      );
      const getUpdatedProfile = await users
        .findById({ _id })
        .select("-password")
        .select("-cpassword");
      res.status(200).json({
        status: "Success",
        message: "Profile Update",
        Profile: getUpdatedProfile,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "Fail", Message: process.env.SWW });
  }
};

// This controler is not use for now....

/**
 * Add Bio Controler function....
 * @author Patel Ayush
 * @param {String} req
 * @param {String} res
 */
export const addBio = async (req, res) => {
  console.log("======== Authenticate User Add BIO controller. ========");

  const { id: _id } = req.user; // get user id from token
  const { BIO } = req.body;

  console.log(_id);
  try {
    if (BIO) {
      const newUser = await users.findByIdAndUpdate(
        { _id },
        {
          $set: {
            userBio: BIO,
          },
        }
      );
      console.log(newUser);
      res
        .status(200)
        .json({ Status: "Success", Message: "Bio Update Succesfull..." });
    } else {
      res.status(400).json({
        Status: "Fail",
        Message: "Please Enter Value In Bio Filed...",
      });
    }
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ Status: "Fail", Message: "Something Went Wrong..." });
  }
};

/**
 * Controller Function Get All User Data.
 * @author Patel Ayush
 * @param {String} req
 * @param {String} res
 */
export const getAllUserData = async (req, res) => {
  console.log("===== Authenticate User Get All User Data. =======");

  try {
    const Data = await users.find(
      {},
      { _id: 0, password: 0, cpassword: 0, __v: 0 }
    ); // Use projection for negleating filed for selecting query....
    res
      .status(200)
      .send({ Status: "Sucsess", DATA_COUNT: Data.length, DATA: Data });
  } catch (error) {
    res.status(500).send({ Status: "Fail", Message: error });
  }
};

/**
 * Controller Function Get Delete Bio Data filed.
 * @author Patel Ayush
 * @param {String} req
 * @param {String} res
 */
export const deleteBio = async (req, res) => {
  console.log("======== Authenticate User Delete BIO controller. ========");

  const { id: _id } = req.user; // get user id from token

  try {
    const userById = await users.findById(_id);
    if (userById.userBio) {
      const newUser = await users.findByIdAndUpdate(
        { _id },
        {
          $unset: {
            userBio: "",
          },
        }
      );
      res.status(200).json({ Status: "Fail", Message: "Bio Deleted..." });
    } else {
      return res
        .status(400)
        .send({ Status: "Fail", Message: "User Bio is empty..." });
    }
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ Status: "Fail", Message: "Something Went Wrong..." });
  }
};
