// Middleware to get user token....
import jwt from "jsonwebtoken";
import users from "../models/userModel.js";

/**
 * Auth Middleware for Verfiy User Token...
 * @author Patel Ayush
 * @param {String} req
 * @param {String} res
 * @param {String} next
 */
const auth = async (req, res, next) => {
  console.log("========= Auth Middle Ware ======");

  let token;
  const { authorization } = req.headers;

  if (authorization && authorization.startsWith("Bearer")) {
    try {
      // Get Token from header
      token = authorization.split(" ")[1];

      // Verify Token
      const { userID } = jwt.verify(token, process.env.JWT_SECRET);

      // Get User Information From Token
      req.user = await users.findById({_id:userID})
        .select("-password")
        .select("-cpassword");
        // console.log(req.user);
      next();
    } catch (error) {
      console.log(error);
      res
        .status(401)
        .send({ status: "Fail", message: process.env.INVADLI_TOKEN });
    }
  }
  if (!token) {
    res
      .status(401)
      .send({ status: "Fail", message: process.env.EMPTY_TOKEN });
  }
};

export default auth;