// platform controller file
import mongoose from "mongoose";

import platfrom from "../models/platfrom.js";
import prodcutModel from "../models/prodcutModel.js";
import * as error from "../messages/error.js"; // read error file...

//platform collection....

/**
 * Insert platfrom in platfrom collection...
 * @author Patel Ayush
 * @param {String} req
 * @param {String} res
 */
export const insertplatfrom = async (req, res) => {
  console.log("======== Authenticate Add Platform Controller. ========");
  const { id: _id } = req.user;
  console.log(req.body);
  const platformName = req.body.platformName;

  try {
    if (!platformName) {
      res.status(500).json({
        Status: "Fail",
        Message: "Please Enter Value In platformName Filed...",
      });
    } else {
      const postPlatform = new platfrom({ platformName, userId: _id });
      try {
        await postPlatform.save();
        res.status(200).json({ Status: "Success", Message: postPlatform });
      } catch (error) {
        res.status(500).send({
          Status: "Fail",
          Message:
            "Please Enter Platfrom name like :- 'FaceBook', 'Instagram', 'Twitter' ",
        });
      }
    }
  } catch (error) {
    res
      .status(400)
      .json({ Status: "Fail", Message: "Something Went Wrong..." });
  }
};

/**
 * Update platfrom in platfrom collection...
 * @author Patel Ayush
 * @param {String} req
 * @param {String} res
 */
export const updatePlatform = async (req, res) => {
  try {
    console.log("======== Authenticate updatePlatform Controller. ========");
    const { id: _id } = req.user;
    const platfromId = req.body.platfromId;
    const platformName = req.body.platformName;

    if (!platfromId && !platformName) {
      res.status(500).send({
        Status: "Fail",
        Message: "Please Enter Platfrom ID And Platfrom Name.",
      });
    } else if (!platfromId) {
      res
        .status(500)
        .send({ Status: "Fail", Message: "Please Enter Platfrom ID." });
    } else if (!platformName) {
      res
        .status(500)
        .send({ Status: "Fail", Message: "Please Enter Platfrom Name." });
    } else if (!mongoose.Types.ObjectId.isValid(platfromId)) {
      res
        .status(500)
        .send({ status: "Fail", Message: "Please Enter Valid Platfrom Id..." });
    } else if (
      platformName != "FaceBook" &&
      platformName != "Instagram" &&
      platformName != "Twitter" &&
      platformName != "Insta" &&
      platformName != "FB"
    ) {
      res
        .status(404)
        .send({ status: "Fail", Message: process.env.INSERT_PLATFORM });
    } else {
      const findplaatform = await platfrom.findById({ _id: platfromId });
      if (findplaatform) {
        const updateProdcut = await platfrom.findOneAndUpdate(
          { _id: platfromId, userId: _id },
          {
            $set: {
              platformName: platformName,
            },
          }
        );
        const getupdatePlatfrom = await platfrom
          .findById({ _id: platfromId })
          .select("-userId")
          .select("-__v");

        if (!updateProdcut) {
          res.status(400).send({
            status: "Fail",
            Message: process.env.INVALID_TOKEN_ERROR,
          });
        } else {
          res.status(200).send({
            status: "Success",
            Message: "Data Updated...",
            Update_Record: getupdatePlatfrom,
          });
        }
      } else {
        res.status(404).send({
          status: "Fail",
          Message: "Platfrom Not Exist in System...",
        });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ Status: "Fail", Error: error });
  }
};

/**
 * Delete platfrom in platfrom collection...
 * @author Patel Ayush
 * @param {String} req
 * @param {String} res
 */
export const deletePlatfrom = async (req, res) => {
  try {
    console.log("======== Authenticate deletePlatfrom Controller. ========");
    const { id: _id } = req.user;
    const platfromId = req.body.platfromId;

    if (!platfromId) {
      res
        .status(500)
        .send({ Status: "Fail", Message: "Please Enter Platfrom ID." });
    } else if (!mongoose.Types.ObjectId.isValid(platfromId)) {
      res
        .status(500)
        .send({ status: "Fail", Message: "Please Enter Valid Platfrom Id..." });
    } else {
      const findplaatform = await platfrom.findById({ _id: platfromId });

      if (findplaatform) {
        const deletePlatform = await platfrom.findOneAndDelete({
          _id: platfromId,
          userId: _id,
        });
        if (deletePlatform) {
          res.status(200).json({
            status: "Success",
            Message: "Platfrom Deleted...",
          });
        } else {
          res.status(400).send({
            status: "Fail",
            Message: process.env.INVALID_TOKEN_ERROR,
          });
        }
      } else {
        res.status(404).send({
          status: "Fail",
          Message: "Platfrom Not Exist in System...",
        });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ Status: "Fail", Error: process.env.SWW });
  }
};

/**
 * Get on platfrom by id in platfrom collection...
 * @author Patel Ayush
 * @param {String} req
 * @param {String} res
 */
export const getOnePlatform = async (req, res) => {
  try {
    console.log(
      "======== Authenticate Add getOnePlatform Controller. ========"
    );
    const { id: _id } = req.user;
    const platfromId = req.body.platfromId;

    if (!platfromId) {
      res
        .status(500)
        .send({ Status: "Fail", Message: "Please Enter Platfrom ID." });
    } else if (!mongoose.Types.ObjectId.isValid(platfromId)) {
      res
        .status(500)
        .send({ status: "Fail", Message: "Please Enter Valid Platfrom Id..." });
    } else {
      const requestePlatfrom = await platfrom.findById({ _id: platfromId });

      if (!requestePlatfrom) {
        res
          .status(404)
          .send({ status: "Fail", Message: "Platfrom Not Exist..." });
      } else {
        const findeplatform = await platfrom.find({
          $and: [{ _id: platfromId }, { userId: _id }],
        });
        if (Object.keys(findeplatform).length === 0) {
          res.status(404).send({
            status: "Fail",
            Message: process.env.INVALID_TOKEN_ERROR,
          });
        } else {
          res.status(200).send({
            status: "Success",
            Data: findeplatform,
          });
        }
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ Status: "Fail", Error: process.env.SWW });
  }
};

/**
 * Get all platfrom in platfrom collection...
 * @author Patel Ayush
 * @param {String} req
 * @param {String} res
 */
export const getAllPlatform = async (req, res) => {
  try {
    console.log("======== Authenticate getAllPlatformm Controller. ========");
    const { id: _id } = req.user;
    const getAllPlatform = await platfrom.find(
      { userId: _id },
      { userId: 0, __v: 0 }
    );
    if (Object.keys(getAllPlatform).length === 0) {
      res.status(400).json({ status: "Fail", Message: "NO Data Found...." });
    } else {
      res.status(200).json({ status: "Success", Data: getAllPlatform });
    }
  } catch (error) {
    res.status(500).send({ Status: "Fail", Error: process.env.SWW });
    console.log(error);
  }
};

/**
 * insert platform in product controller...
 * @author Patel Ayush
 * @param {String} req
 * @param {String} res
 */
export const inserPlaftformintoprodcut = async (req, res) => {
  console.log("======== Authenticate Add Platform Controller. ========");
  const { id: _id } = req.user;
  const platformName = req.body.platformName;
  const prodcutId = req.body.prodcutId;

  try {
    if (!platformName && !prodcutId) {
      res.status(404).send({
        status: "Fail",
        Message: "Please Enter value In prodcutId , platformName...",
      });
    } else if (!platformName) {
      res.status(404).send({
        status: "Fail",
        Message: "Please Enter value In platformName...",
      });
    } else if (!prodcutId) {
      res.status(404).send({
        status: "Fail",
        Message: "Please Enter value In prodcutId...",
      });
    } else {
      const findprodcut = await prodcutModel.findById({ _id: prodcutId });
      if (!findprodcut) {
        res.status(404).send({
          status: "Fail",
          Message: "Prodcut Not Exist in System...",
        });
      } else {
        if (
          platformName != "FaceBook" &&
          platformName != "Instagram" &&
          platformName != "Twitter" &&
          platformName != "Insta" &&
          platformName != "FB"
        ) {
          res.status(404).send({
            status: "Fail",
            Message: error.INVALID_PLATFORM,
          });
        } else {
          try {
            const updateProdcut = await prodcutModel.findOneAndUpdate(
              { _id: prodcutId, userId: _id },
              {
                $set: {
                  platformName: platformName,
                },
              }
            );
            const getUpdatedProdcut = await prodcutModel
              .findById({ _id: prodcutId })
              .select("-_id")
              .select("-userId")
              .select("-__v");

            if (!updateProdcut) {
              res.status(400).send({
                status: "Fail",
                Message: process.env.INVALID_TOKEN_ERROR,
              });
            } else {
              res.status(200).send({
                status: "Success",
                Message: "Data Updated...",
                Update_Record: getUpdatedProdcut,
              });
            }
          } catch (error) {
            console.log(error);
            res.status(500).send({
              Status: "Fail",
              Message: "Someting went wrong...",
            });
          }
        }
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      Status: "Fail",
      Message: "Requested Id Invalid Please Check it...",
    });
  }
};
