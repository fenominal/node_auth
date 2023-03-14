// middleware for verify user roles...

import { AsYouType } from "libphonenumber-js";

export const verifyAdmin = async (req, res, next) => {
  console.log("========= verifyAdmin Middle Ware ======");
  const userRole = req.user.userRole;
  
  if (userRole) {
    if (userRole == "Admin") {
      next();
    } else {
      res
        .status(401)
        .send({ status: "Fail", message: "Only Admin User Have Access....." });
    }
  } else {
    res.status(400).send({ status: "Fail", message: "Invadali Access....." });
  }
};

export const verifyUser = async () => {
  console.log("========= verifyAdmin Middle Ware ======");
  const userRole = req.user.userRole;

  if (userRole) {
    if (userRole == "Admin" || userRole == "Seller") {
      next();
    } else {
      res
        .status(401)
        .send({ status: "Fail", message: "Only Admin And Seller Have Access....." });
    }
  } else {
    res.status(401).send({ status: "Fail", message: "Invalid User....." });
  }
};
