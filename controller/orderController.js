// Order router.//

import mongoose from "mongoose";

// import model files...
import order from "../models/order.js";
import prodcutModel from "../models/prodcutModel.js";

// Import service file..

import { decprodcut } from "../service/prodcutQuntity.js";

/**
 * Controller Function For Order Product..
 * @author Patel Ayush
 * @param {String} req
 * @param {String} res
 */
export const orderProduct = async (req, res) => {
  console.log("======= Authenticate User orderProduct Controler. =======");

  try {
    const { id: _id } = req.user;
    const prodcutId = req.body.prodcutId;
    const ordetType = req.body.orderType;
    const orderQuntity = req.body.quntity;

    if (!prodcutId && !ordetType && !orderQuntity) {
      res.status(500).json({
        status: "Fail",
        message: "Please Enter value in prodcutId ,orderType,quntity  ",
      });
    } else if (!prodcutId) {
      res
        .status(500)
        .send({ Status: "Fail", Message: process.env.EMPTY_PRODCUTID });
    } else if (!mongoose.Types.ObjectId.isValid(prodcutId)) {
      res.status(500).send({ Status: "Fail", Message: process.env.PRODCUT_ID });
    } else if (!ordetType) {
      res
        .status(500)
        .send({ Status: "Fail", Message: "Please Enter value in ordetType." });
    } else if (!orderQuntity) {
      res.status(500).send({
        Status: "Fail",
        Message: "Please Enter value in orderQuntity.",
      });
    } else if (!(typeof orderQuntity == "number")) {
      res.status(500).send({
        Status: "Fail",
        Message: process.env.NOT_ANUMBER_PROQTY,
      });
    } else {
      const inserOrder = new order({
        orderType: ordetType,
        productId: prodcutId,
        userId: _id,
        orderQuntity: orderQuntity,
      });

      try {
        await decprodcut(prodcutId,orderQuntity); // call servicess...

        await inserOrder.save();
        res.status(200).send({ Status: "Success", Prodcuts: "getAllProdcut" });
      } catch (error) {
        console.log(error);
        res.status(500).send({
          Status: "Fail",
          Message: "Please Enter Order type :- Online / COD / Other ",
        });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ Status: "Fail", Message: process.env.SWW });
  }
};
