// Service file for incress and decress count of prodcut and platform...

import users from "../models/userModel.js";

/**
 * Service Function For incress prodcut count when user add prodcut.
 * @author Patel Ayush
 * @param {Object} _id
 */
export const iprodcut = async (_id) => {
  console.log("======= Get iprodcut Services. =========");
  const getUserById = await users.findOneAndUpdate(
    { _id },
    { $inc: { userProdcuts: 1 } }
  );
};

/**
 * Service Function For decress prodcut count when user delete prodcut.
 * @author Patel Ayush
 * @param {Object} _id
 */
export const deprodcut = async (_id) => {
  console.log("======= Get deprodcut Services. =========");
  const getUserById = await users.findOneAndUpdate(
    { _id },
    { $inc: { userProdcuts: -1 } }
  );
};

/**
 * Service Function For incress platform count when user insert platfrom.
 * @author Patel Ayush
 * @param {Object} _id
 */
export const iplatform = async (_id) => {
  console.log("======= Get iplatform Services. =========");
  const getUserById = await users.findOneAndUpdate(
    { _id },
    { $inc: { userPlatforms: 1 } }
  );

  console.log(getUserById);
};

/**
 * Service Function For decress platform count when user delete platfrom.
 * @author Patel Ayush
 * @param {Object} _id
 */
export const deplatform = async (_id) => {
  console.log("======= Get deplatform Services. =========");
  const getUserById = await users.findOneAndUpdate(
    { _id },
    { $inc: { userPlatforms: -1 } }
  );
};
