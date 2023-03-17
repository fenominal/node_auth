// Authenticate user prodcut curd opration. //
import prodcutModel from "../models/prodcutModel.js";
import users from "../models/userModel.js";

// Import servicess
import { getUserProduct } from "../service/getUserProdcut.js";
import { iprodcut, deprodcut } from "../service/count.js";

/**
 * Controller Function for Inster Prodcut.
 * @author Patel Ayush
 * @param {String} req
 * @param {String} res
 */
export const insertProdcut = async (req, res) => {
  console.log("======= Authenticate User insertProdcut Controler. =======");
  const prodcutData = req.body;
  const { id: _id } = req.user;
  try {
    if (
      !prodcutData.prodcutName &&
      !prodcutData.prodcutType &&
      !prodcutData.prodcutQuentity
    ) {
      res.status(404).send({
        status: "Fail",
        Message:
          "Please Enter value In prodcutName,prodcutType,prodcutQuentity...",
      });
    } else if (!prodcutData.prodcutName) {
      res.status(404).send({
        status: "Fail",
        Message: "Please Enter Prodcut Name...",
      });
    } else if (!prodcutData.prodcutType) {
      res.status(404).send({
        status: "Fail",
        Message: "Please Enter Prodcut Type...",
      });
    } else if (!prodcutData.prodcutQuentity) {
      res.status(404).send({
        status: "Fail",
        Message: "Please Enter Prodcut Quentity...",
      });
    } else if (!(typeof prodcutData.prodcutQuentity == "number")) {
      res.status(404).send({
        status: "Fail",
        Message: "Please Enter Number In prodcutQuentity...",
      });
    } else {
      const postProdcut = new prodcutModel({ ...prodcutData, userId: _id });
      try {
        await postProdcut.save();
        await iprodcut(_id); // call increment servicess....

        res.status(200).json({
          status: "Success",
          Message: "Prodcut Added...",
          Prodcut: postProdcut,
        });
      } catch (error) {
        console.log(error);
        res.status(500).send({
          Status: "Fail",
          Message: process.env.SWW,
        });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ Status: "Fail", Message: process.env.SWW });
  }
};

/**
 * Controller Function For Delete Prodcut.
 * @author Patel Ayush
 * @param {String} req
 * @param {String} res
 */
export const deletSelfProdcut = async (req, res) => {
  console.log(
    "======= Authenticate User deletSelfProdcut Controller. ========"
  );
  const { id: _id } = req.user;
  const prodcutID = req.body.prodcutID;

  try {
    if (prodcutID) {
      const Data = await prodcutModel.findById({ _id: prodcutID });
      if (!Data) {
        return res.status(404).send({
          status: "Fail",
          Message: "Prodcut Not Exist...",
        });
      } else {
        const deletedata = await prodcutModel.findOneAndDelete({
          _id: prodcutID,
          userId: _id,
        });
        if (!deletedata) {
          res
            .status(400)
            .json({ status: "Fail", Message: process.env.INVALID_TOKEN_ERROR });
        } else {
          await deprodcut(_id);
          res.status(200).json({
            status: "Success",
            Message: "Prodcut Deleted...",
          });
        }
      }
    } else {
      res.status(400).send({
        status: "Fail",
        Message: "Please Enter Prodcut ID.",
      });
    }
  } catch (error) {
    res.status(500).send({
      Status: "Fail",
      Message: process.env.PRODCUT_ID,
    });
  }
};

/**
 * Controller Function For Update Prodcut.
 * @author Patel Ayush
 * @param {String} req
 * @param {String} res
 */
export const updateSelfProdcut = async (req, res) => {
  console.log(
    "====== Authenticate User updateSelfProdcut Controller ========="
  );

  const { id: _id } = req.user;
  // const prodcutID = req.params.ID;
  const prodcutID = req.body.prodcutID;
  const { prodcutName, prodcutType, prodcutQuentity } = req.body;

  try {
    if (!prodcutID && !prodcutName && !prodcutType && !prodcutQuentity) {
      res.status(404).send({
        status: "Fail",
        Message:
          "Please Enter value In prodcutID,prodcutName,prodcutType,prodcutQuentity ...",
      });
    } else if (!prodcutID) {
      res.status(404).send({
        status: "Fail",
        Message: "Please Enter Prodcut Id...",
      });
    } else if (!prodcutName) {
      res.status(404).send({
        status: "Fail",
        Message: "Please Enter Prodcut Name...",
      });
    } else if (!prodcutType) {
      res.status(404).send({
        status: "Fail",
        Message: "Please Enter Prodcut Type...",
      });
    } else if (!prodcutQuentity) {
      res.status(404).send({
        status: "Fail",
        Message: "Please Enter Prodcut Quentity...",
      });
    } else if (!(typeof prodcutQuentity == "number")) {
      // isNaN(prodcutQuentity);
      res.status(404).send({
        status: "Fail",
        Message: "Please Enter Number In prodcutQuentity...",
      });
    } else {
      const findprodcut = await prodcutModel.findById({ _id: prodcutID });

      if (!findprodcut) {
        res.status(404).send({
          status: "Fail",
          Message: "Prodcut Not Exist in System...",
        });
      } else {
        const updateProdcut = await prodcutModel.findOneAndUpdate(
          { _id: prodcutID, userId: _id },
          {
            $set: {
              prodcutName: prodcutName,
              prodcutType: prodcutType,
              prodcutQuentity: prodcutQuentity,
            },
          }
        );
        const getUpdatedProdcut = await prodcutModel
          .findById({
            _id: prodcutID,
          })
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
      }
    }
  } catch (error) {
    res.status(500).send({
      Status: "Fail",
      Message: "Requested Id Invalid Please Check it...",
    });
  }
};

/**
 * Controller Function For List Of all Prodcut.
 * @author Patel Ayush
 * @param {String} req
 * @param {String} res
 */
export const getAllProduct = async (req, res) => {
  console.log("====== Authenticate User getAllProduct Controller. =========");
  try {
    const { id: _id } = req.user;
    const getAllProdcut = await prodcutModel.find({});
    res.status(200).send({ Status: "Success", Prodcuts: getAllProdcut });
  } catch (error) {
    console.log(error);
    res.status(500).send({ Status: "Fail", Message: process.env.SWW });
  }
  const { id: _id } = req.user;
};

// This contoler not usefulll for now....

/**
 * Controller Function for Get All Product For Loged User.
 * @author Patel Ayush
 * @param {String} req
 * @param {String} res
 */
export const getSelfProdcut = async (req, res) => {
  console.log("======= Authenticate User getSelfProdcut Controler. =======");
  const { id: _id } = req.user;
  try {
    const getData = await getUserProduct(_id); // calling servicess

    if (Object.keys(getData).length === 0) {
      res.status(400).json({ status: "Fail", Message: "NO Data Found...." });
    } else {
      res.status(200).json(getData);
    }
  } catch (error) {
    res.status(500).send({ Status: "Fail", Error: error });
    console.log(error);
  }
};

/**
 * Controller Function For Get One Perticuler Product For Loged User.
 * @author Patel Ayush
 * @param {String} req
 * @param {String} res
 */
export const getSelfOnProdcut = async (req, res) => {
  console.log("====== Authenticate User getSelfOnProdcut Controller. ========");
  const { id: _id } = req.user;

  try {
    const prodcut_id = req.body.prodcut_id;
    if (prodcut_id) {
      const requestprodcut = await prodcutModel.findById({ _id: prodcut_id });
      if (!requestprodcut) {
        res
          .status(404)
          .send({ status: "Fail", Message: "Prodcut Not Exist..." });
      } else {
        const Data = await prodcutModel.find({
          $and: [{ _id: prodcut_id }, { userId: _id }],
        });
        if (Object.keys(Data).length === 0) {
          console.log(Data);
          res.status(404).send({
            status: "Fail",
            Message: process.env.INVALID_TOKEN_ERROR,
          });
        } else {
          res.status(200).send({
            status: "Success",
            Data: Data,
          });
        }
      }
    } else {
      res.status(400).send({
        status: "Fail",
        Message: "Please Enter Prodcut ID.",
      });
    }
  } catch (error) {
    res.status(500).send({
      Status: "Fail",
      Message: "Requested prodcut Id Invalid Please Check it...",
    });
    // console.log(error);
  }
};
