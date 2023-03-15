// Aggregation Controllers file...
import mongoose from "mongoose";

import users from "../models/userModel.js";
import prodcutModel from "../models/prodcutModel.js";

/**
 * get One User id with added prodcut...
 * Aggregation between user -> prodcut
 * @author Patel Ayush
 * @param {String} req
 * @param {String} res
 */
export const getOneUserProdcut = async (req, res) => {
  try {
    console.log(
      "====== Authenticate User getOneUserProdcut Controller. ========"
    );
    const { id: _id } = req.user;
    if (!req.body.userID) {
      res
        .status(500)
        .send({ status: "Fail", Message: process.env.EMPTY_USERID });
    } else if (!mongoose.Types.ObjectId.isValid(req.body.userID)) {
      res.status(500).send({ status: "Fail", Message: process.env.USER_ID });
    } else {
      var id = new mongoose.Types.ObjectId(req.body.userID);
      const getUserByID = await users.findById({ _id: id });
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
          res
            .status(200)
            .send({ status: "Fail", Message: process.env.EMPTY_DATA });
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
          Message: process.env.USER_NOTEXISTE,
        });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "Fail",
      Message: process.env.SWW,
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
  try {
    console.log(
      "====== Authenticate User getUserFromProdut Controller. ========"
    );

    if (!req.body.prodcutId) {
      res
        .status(500)
        .send({ status: "Fail", Message: process.env.EMPTY_PRODCUTID });
    } else if (!mongoose.Types.ObjectId.isValid(req.body.prodcutId)) {
      res.status(500).send({ status: "Fail", Message: process.env.PRODCUT_ID });
    } else {
      var id = new mongoose.Types.ObjectId(req.body.prodcutId);
      const getProdcutByName = await prodcutModel.find({ _id: id });
      if (Object.keys(getProdcutByName).length === 0) {
        res
          .status(404)
          .send({ status: "Fail", Message: process.env.PRODCUT_NOTEXISTE });
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
        res
          .status(200)
          .send({ status: "Success", Message: getUserWithProdcut });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(200).send({ status: "Fail", Message: process.env.SWW });
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
// user-product-platforms

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
    res.status(500).send({ status: "Fail", Message: process.env.EMPTY_USERID });
  } else if (!mongoose.Types.ObjectId.isValid(req.body.userID)) {
    res.status(500).send({ status: "Fail", Message: process.env.USER_ID });
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
          res
            .status(500)
            .send({ status: "Fail", Message: process.env.EMPTY_DATA });
        } else {
          res
            .status(200)
            .send({ status: "Success", Message: getUserWithProdcut });
        }
      } else {
        res
          .status(500)
          .send({ status: "Fail", Message: process.env.USER_NOTEXISTE });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({ status: "Fail", Message: process.env.SWW });
    }
  }
};
