// Aggregation Controllers file...
import users from "../models/userModel.js";
import mongoose from "mongoose";

import prodcutModel from "../models/prodcutModel.js";

export const getOneUserProdcut = async (req, res) => {
  console.log(
    "====== Authenticate User getOneUserProdcut Controller. ========"
  );
  const { id: _id } = req.user;
  try {
    var id = new mongoose.Types.ObjectId(req.body.userID);

    if (!req.body.userID) {
      res
        .status(500)
        .send({ status: "Fail", message: "Please Enter User Id....." });
    } else {
      const getUserByID = await users.findById({ _id: id });
      console.log(getUserByID);
      if (getUserByID) {
        const getUserWithProdcut = await users.aggregate([
          {
            $lookup: {
              from: "prodcuts",
              localField: "_id",
              foreignField: "userId",
              as: "Prodcut",
            },
          },
          { $match: { _id: id } },
          {
            $project: {
              _id: 0,
              password: 0,
              cpassword: 0,
              "Prodcut._id": 0,
              "Prodcut.userId": 0,
            },
          },
        ]);

        if (Object.keys(getUserWithProdcut).length === 0) {
          res.status(200).send({ status: "Fail", message: "No Data Found..." });
        } else {
          let var1 = Object.entries(getUserWithProdcut);
          const var2 = var1[0];

          if (Object.keys(var2[1].Prodcut).length === 0) {
            res.status(200).send({
              status: "Fail",
              message: "No Prodcut Found For This User....",
            });
          } else {
            res
              .status(200)
              .send({ status: "Sucess", message: getUserWithProdcut });
          }
        }
      } else {
        res.status(500).send({
          status: "Fail",
          message: "User Not Existe In System.....",
        });
      }
    }
  } catch (error) {
    res.status(500).send({
      status: "Fail",
      message: "Requested Id is not valid Please Check.....",
    });
  }
};

export const allUserWithProdcut = async (req, res) => {
  console.log(
    "====== Authenticate User allUserWithProdcut Controller. ========"
  );

  const getAll = await users.aggregate([
    {
      $lookup: {
        from: "prodcuts",
        localField: "_id",
        foreignField: "userId",
        as: "Prodcut",
      },
    },
    {
      $project: {
        _id: 0,
        password: 0,
        cpassword: 0,
        __v:0,
        "Prodcut._id": 0,
        "Prodcut.userId": 0,
        "Prodcut.__v":0
      },
    },
  ]);
  try {
    res.status(200).send({ status: "Success", Message: getAll });
  } catch (error) {
    res.status(404).send({ status: "Fail", Error: error });
  }
};

// Get User details from prodcut...
export const getUserFromProdut = async (req, res) => {
  console.log(
    "====== Authenticate User getUserFromProdut Controller. ========"
  );
  try {
    var id = new mongoose.Types.ObjectId(req.body.prodcutId);
    console.log(typeof id);
    const getProdcutByName = await prodcutModel.find({ _id: id });

    if (!id) {
      res
        .status(500)
        .send({ status: "Fail", message: "Please Enter Prodcut Id....." });
    } else {
      if (Object.keys(getProdcutByName).length === 0) {
        res
          .status(404)
          .send({ status: "Fail", message: "Prodcut Not Existe..." });
      } else {
        const getUserWithProdcut = await prodcutModel.aggregate([
          {
            $lookup: {
              from: "users",
              localField: "userId",
              foreignField: "_id",
              as: "user",
            },
          },
          { $match: { _id: id } },
          {
            $project: {
              _id: 0,
              userId: 0,
              __v: 0,
              "user._id": 0,
              "user.password": 0,
              "user.cpassword": 0,
              "user.__v": 0,
            },
          },
        ]); // aggregation.

        try {
          res
            .status(200)
            .send({ status: "Success", message: getUserWithProdcut });
        } catch (error) {
          res.status(500).send({ status: "Fail", message: error });
        }
      }
    }
  } catch (error) {
    res
      .status(500)
      .send({
        status: "Fail",
        message: "Requested Id is not valid Please Check.....",
      });
  }
};

export const getAllProdcutDetails = async (req, res) => {
  console.log(
    "====== Authenticate User getAllProdcutDetails Controller. ========"
  );

  const getUserWithProdcut = await prodcutModel.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "user",
      },
    },
    {
      $project: {
        _id: 0,
        userId: 0,
        __v: 0,
        "user._id": 0,
        "user.password": 0,
        "user.cpassword": 0,
        "user.__v": 0,
      },
    },
  ]);
  try {
    res.status(200).send({ status: "Success", message: getUserWithProdcut });
  } catch (error) {
    res.status(500).send({ status: "Fail", message: error });
  }
};
