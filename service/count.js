// Service file for incress and decress count of prodcut and platform...

import users from "../models/userModel.js";

/**
 * Service Function For incress prodcut count when user add prodcut.
 * users->products-platforms
 * @author Patel Ayush
 * @param {Object} UserId
 */
export const iprodcut = async (_id) => {
  console.log("======= Get iprodcut Services. =========");
  const getUserById = await users.findOneAndUpdate(
    { _id },
    { $inc: { userProdcuts: 1 } }
  );
};

export const deprodcut = async (_id) => {
  console.log("======= Get deprodcut Services. =========");
  const getUserById = await users.findOneAndUpdate(
    { _id },
    { $inc: { userProdcuts: -1 } }
  );
};
