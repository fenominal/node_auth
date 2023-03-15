// Aggregation Controllers file...
import users from "../models/userModel.js";
import mongoose from "mongoose";

import prodcutModel from "../models/prodcutModel.js";

/**
 * get One User id with added prodcut...
 * Aggregation between user -> prodcut
 * @author Patel Ayush
 * @param {String} req
 * @param {String} res
 */
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
        .send({ status: "Fail", Message: "Please Enter User Id....." });
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
          res.status(200).send({ status: "Fail", Message: "No Data Found..." });
        } else {
          let var1 = Object.entries(getUserWithProdcut);
          const var2 = var1[0];

          if (Object.keys(var2[1].Prodcut).length === 0) {
            res.status(200).send({
              status: "Fail",
              Message: "No Prodcut Found For This User....",
            });
          } else {
            res
              .status(200)
              .send({ status: "Sucess", Message: getUserWithProdcut });
          }
        }
      } else {
        res.status(500).send({
          status: "Fail",
          Message: "User Not Existe In System.....",
        });
      }
    }
  } catch (error) {
    res.status(500).send({
      status: "Fail",
      Message: "Requested Id is not valid Please Check.....",
    });
  }
};

/**
 * Get all User with prodcut.
 * Aggregation between users -> prodcut.
 * @author Patel Ayush
 * @param {String} req
 * @param {String} res
 */
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
        __v: 0,
        "Prodcut._id": 0,
        "Prodcut.userId": 0,
        "Prodcut.__v": 0,
      },
    },
  ]);

  try {
    res.status(200).send({ status: "Success", Message: getAll });
  } catch (error) {
    res.status(404).send({ status: "Fail", Error: error });
  }
};

/**
 * Get One Prodcut details by id with user details...
 *  Aggregation between prodcut -> users
 * @author Patel Ayush
 * @param {String} req
 * @param {String} res
 */
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
        .send({ status: "Fail", Message: "Please Enter Prodcut Id....." });
    } else {
      if (Object.keys(getProdcutByName).length === 0) {
        res
          .status(404)
          .send({ status: "Fail", Message: "Prodcut Not Existe..." });
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
            .send({ status: "Success", Message: getUserWithProdcut });
        } catch (error) {
          res.status(500).send({ status: "Fail", Message: error });
        }
      }
    }
  } catch (error) {
    res.status(500).send({
      status: "Fail",
      Message: "Requested Id is not valid Please Check.....",
    });
  }
};

/**
 * Get All Prodcut details with user details...
 * Aggregation between prodcut -> users
 * @author Patel Ayush
 * @param {String} req
 * @param {String} res
 */
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
    res.status(200).send({ status: "Success", Message: getUserWithProdcut });
  } catch (error) {
    res.status(500).send({ status: "Fail", Message: error });
  }
};

// aggregation between 3 collection controllers.

/**
 * Get All User details with thier added prodcut and added platform...
 * Aggregation between User -> prodcut-platform
 * @author Patel Ayush
 * @param {String} req
 * @param {String} res
 * @returns {Aggrgation}
 */
export const getUserProdcutPlatfrom = async (req, res) => {
  console.log(
    "====== Authenticate User getUserProdcutPlatfrom Controller. ========"
  );
  const { id: _id } = req.user;

  const getUserWithProdcut = await users.aggregate([
    {
      $lookup: {
        from: "prodcuts",
        localField: "_id",
        foreignField: "userId",
        as: "Prodcut",
      },
    },
    {
      $lookup: {
        from: "platforms",
        localField: "_id",
        foreignField: "userId",
        as: "Platform",
      },
    },
    {
      $project: {
        _id: 0,
        password: 0,
        cpassword: 0,
        __v: 0,
        "Prodcut._id": 0,
        "Prodcut.userId": 0,
        "Prodcut.__v": 0,
        "Platform._id": 0,
        "Platform.userId": 0,
        "Platform.__v": 0,
      },
    },
  ]);
  try {
    res.status(200).send({ status: "Success", Message: getUserWithProdcut });
  } catch (error) {
    res.status(500).send({ status: "Fail", Message: error });
  }
};

/**
 * Get All User details with thier added prodcut and added platform...
 * Aggregation between User -> prodcut-platform
 * @author Patel Ayush
 * @param {String} req
 * @param {String} res
 * @returns {Aggrgation}
 */
export const getoneUserprodcutplatform = async (req, res) => {
  console.log(
    "====== Authenticate User getoneUserprodcutplatform Controller. ========"
  );
  const { id: _id } = req.user;

  if (!req.body.userID) {
    res
      .status(500)
      .send({ status: "Fail", Message: "Please Enter User ID..." });
  } else if (!mongoose.Types.ObjectId.isValid(req.body.userID)) {
    res
      .status(500)
      .send({ status: "Fail", Message: "Please Enter valid User ID..." });
  } else {
    const UserId = new mongoose.Types.ObjectId(req.body.userID);
    try {
      const getUserByID = await users.findById({ _id: UserId });
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
          {
            $lookup: {
              from: "platforms",
              localField: "_id",
              foreignField: "userId",
              as: "Platform",
            },
          },
          { $match: { _id: UserId } },
          {
            $project: {
              _id: 0,
              password: 0,
              cpassword: 0,
              __v: 0,
              "Prodcut._id": 0,
              "Prodcut.userId": 0,
              "Prodcut.__v": 0,
              "Platform._id": 0,
              "Platform.userId": 0,
              "Platform.__v": 0,
            },
          },
        ]);
        if (Object.keys(getUserWithProdcut).length === 0) {
          res.status(500).send({ status: "Fail", Message: "No Data Found..." });
        } else {
          res
            .status(200)
            .send({ status: "Success", Message: getUserWithProdcut });
        }
      } else {
        res.status(500).send({
          status: "Fail",
          Message: "User Not Existe In System.....",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({ status: "Fail", Message: "error" });
    }
  }
};
