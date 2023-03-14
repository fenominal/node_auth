// Not requier Now
import users from "../models/userModel.js";
import prodcutModel from "../models/prodcutModel.js";
import mongoose from "mongoose";

export const updateRole = async (req, res) => {
  console.log("======== Admin updateRole Controller. =========");

  try {
    if (!req.body.userID && !req.body.userRole) {
      res.status(500).send({
        status: "Fail",
        message: "Please Enter User Id And User Role .....",
      });
    } else if (!req.body.userID) {
      res
        .status(500)
        .send({ status: "Fail", message: "Please Enter User Id ....." });
    } else if (!req.body.userRole) {
      res
        .status(500)
        .send({ status: "Fail", message: "Please Enter User Role....." });
    } else {
      var id = new mongoose.Types.ObjectId(req.body.userID);
      const getUserById = await users.findById({ _id: id });

      if (getUserById) {
        if (req.body.userRole == "Seller" || req.body.userRole == "User") {
          res.status(200).send({ status: "Success", message: getUserById });
          const newUser = await users.findByIdAndUpdate(
            { _id: id },
            {
              $set: {
                userRole: req.body.userRole,
              },
            }
          );
          console.log(newUser);
        } else {
          res.status(400).send({
            status: "Success",
            message: "Please Enter Valid User Role.....",
          });
        }
      } else {
        res
          .status(400)
          .send({ status: "Fail", message: "User Not Existe In System....." });
      }
    }
  } catch (error) {
    res.status(500).send({
      status: "Fail",
      message: "Requested Id is not valid Please Check.....",
    });
  }
};
