// service file for incress and decress prodcut count whene uer order the prodcut and cancel prodcut.....

import prodcutModel from "../models/prodcutModel.js";

/**
 * Service Function For Decress prodcut quntity when user order prodcut.
 * @author Patel Ayush
 * @param {Object} prodcutId
 * @param {interger}orderQuntity
 */
export const decprodcut = async (prodcutId, orderQuntity) => {
  console.log(orderQuntity);
  console.log("======= decprodcut Services. =========");
  const getUserById = await prodcutModel.findOneAndUpdate(
    { _id: prodcutId },
    { $inc: { prodcutQuentity: -orderQuntity } }
  );
};

/**
 * Service Function For Incress prodcut quntity when user order prodcut.
 * @author Patel Ayush
 * @param {Object} prodcutId
 * @param {interger}orderQuntity
 */
export const inprodcut = async (prodcutId, orderQuntity) => {
  console.log(orderQuntity);
  console.log("======= inprodcut Services. =========");
  const getUserById = await prodcutModel.findOneAndUpdate(
    { _id: prodcutId },
    { $inc: { prodcutQuentity: orderQuntity } }
  );
};
