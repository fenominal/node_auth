// platform controller file

import platfrom from "../models/platfrom.js";
import prodcutModel from "../models/prodcutModel.js";
import * as error from "../messages/error.js";// read error file...

//insert platform in product controller.
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
          platformName != "Twitter"
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

// Insert platfrom in platfrom collection.
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
        console.log(error);
        res.status(500).send({
          Status: "Fail",
          Message:
            "Please Enter Platfrom name like :- 'FaceBook', 'Instagram', 'Twitter' ",
        });
      }
    }
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ Status: "Fail", Message: "Something Went Wrong..." });
  }
};
