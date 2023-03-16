// User Sign in Sign Up Controller file.//

// Import From validation package.
import validator from "validator";
import passwordValidator from "password-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//import from  usermodel
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

// const CheckPhoneReger = /^[6-9]\d{9}$/gi; // PhoneNumber Regexepration.

/**
 * Controller Function for Signup.
 * @author Patel Ayush
 * @param {String} req
 * @param {String} res
 */
export const signup = async (req, res) => {
  console.log("========== Signup Controller. ==========");

  try {
    //GET DATA FROM BODY.
    const { email, fullName, password, conform_password, mobile } = req.body;
    const lowerEmail = email.toLowerCase(); // covert email in to lower case...

    const CheckPhoneReger = /^[6-9]\d{9}$/gi; // Phone Number Reger define local in Function.
    const valid_phone = CheckPhoneReger.test(mobile);
    const valid_email = validator.isEmail(lowerEmail);
    const valid_password = PasswordCheckSchema.validate(password);

    if (!lowerEmail && !password && !conform_password && !mobile && !fullName) {
      res.status(500).json({
        status: "Fail",
        message: process.env.EMPTY_SIGNUP_ALL,
      });
    } else if (!lowerEmail) {
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
    } else if (!(typeof mobile == "number")) {
      res.status(500).json({
        status: "Fail",
        message: process.env.NOT_ANUMBER_PHONE,
      });
    } else {
      const existinguser = await users.findOne({ userEmail: lowerEmail });
      const existinguserPhone = await users.find({ userMobile: mobile });
      if (valid_email) {
        if (!existinguser) {
          if (Object.keys(existinguserPhone).length === 0) {
            if (valid_password) {
              if (password == conform_password) {
                if (valid_phone) {
                  const hashedPassword = await bcrypt.hash(password, 12);
                  const hashedCPassword = await bcrypt.hash(
                    conform_password,
                    12
                  );
                  const newUser = await users.create({
                    userEmail: lowerEmail,
                    cpassword: hashedCPassword,
                    password: hashedPassword,
                    userMobile: mobile,
                    userFullName: fullName,
                    userProdcuts:0,
                    userPlatforms:0
                  });
                  // console.log(newUser);
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
    res.status(500).send({ status: "Fail", Message: process.env.SWW });
  }
};

/**
 * Controller Function for SignIn.
 * @author Patel Ayush
 * @param {String} req
 * @param {String} res
 */
export const signIn = async (req, res) => {
  console.log("=========== SigIn Controller. ==========");

  try {
    const { email, password } = req.body;
    const valid_email = validator.isEmail(email);
    const valid_password = PasswordCheckSchema.validate(password);

    if (!email && !password) {
      res.status(500).json({
        status: "Fail",
        Message: process.env.EMPTY_LOGIN_ALL,
      });
    } else if (!email) {
      res
        .status(500)
        .json({ status: "Fail", Message: process.env.EMPTY_EMAIL });
    } else if (!password) {
      res
        .status(500)
        .json({ status: "Fail", Message: process.env.EMPTY_PASSWORD });
    } else {
      if (!valid_email) {
        return res
          .status(404)
          .json({ status: "Fail", Message: process.env.INVADLI_EMAIL });
      } else if (!valid_password) {
        return res.status(404).json({
          status: "Fail",
          Message: process.env.INVALID_PASSWORD,
        });
      } else {
        const existinguser = await users.findOne({ userEmail: email });
        if (existinguser) {
          const isMtachPassword = await bcrypt.compare(
            password,
            existinguser.password
          );
          if (isMtachPassword) {
            // Here Generate token.
            // const token = await existinguser.gerateAuthToken(); // Function from model js

            const token = jwt.sign(
              { userID: existinguser._id },
              process.env.JWT_SECRET,
              { expiresIn: "2d" }
            ); // Generate Token with user id....

            res.send({
              status: "Success",
              message: process.env.LOGIN_SUCCESS,
              UserId: existinguser._id,
              token: token,
            });
          } else {
            res
              .status(500)
              .json({ status: "Fail", Message: process.env.INCORRECT_PASS });
          }
        } else {
          res
            .status(500)
            .json({ status: "Fail", Message: process.env.INCORRECT_EMAIL });
        }
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "Fail", Message: process.env.SWW });
  }
};
