// Aggregation servicess File.
import mongoose from "mongoose";

import users from "../models/userModel.js";
import prodcutModel from "../models/prodcutModel.js";

/**
 * Service Function For Aggregation for get all user data with prodcut and added platform.
 * users->products-platforms
 * @author Patel Ayush
 * @returns getUserWithProdcut
 */
export const allUserProdcutPlatform = async () => {
  console.log("======= Get allUserProdcutPlatform Services. =========");
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
  return getUserWithProdcut;
};

/**
 * Service Function For Aggregation for get one user data with prodcut and added platform .
 * users->products-platforms
 * @author Patel Ayush
 * @param {Object} UserId
 * @returns getUserWithProdcut
 */
export const getUserprodcutplatform = async (UserId) => {
  console.log("======= Get getUserprodcutplatform Services. =========");
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
  return getUserWithProdcut;
};

/**
 * Service Function For Aggregation for get all user data with prodcut .
 * users->products
 * @author Patel Ayush
 * @returns getAll
 */
export const UserWithProdcut = async () => {
  console.log("======= Get UserWithProdcut Services. =========");
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
  return getAll;
};

/**
 * Service Function For Aggregation for get one user data with prodcut .
 * users->products
 * @author Patel Ayush
 * @param {Object} id
 * @returns getUserWithProdcut
 */
export const getUserWithProduct = async (id) => {
  console.log("======= Get getUserWithProduct Services. =========");
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
  return getUserWithProdcut;
};

/**
 * Service Function For Aggregation for get one prodcut data with user.
 * users->products
 * @author Patel Ayush
 * @param {Object} id
 * @returns getUserWithProdcut
 */
export const getProdcutUser = async (ID) => {
  console.log("======= Get getProdcutUser Services. =========");

  const getUserWithProdcut = await prodcutModel.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "user",
      },
    },
    { $match: { _id: ID } },
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

  return getUserWithProdcut;
};