// Order router.//

import mongoose from "mongoose";

// import model files...
import order from "../models/order.js";
import prodcutModel from "../models/prodcutModel.js";

// Import service file..

import { decprodcut, inprodcut } from "../service/prodcutQuntity.js";

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
        await decprodcut(prodcutId, orderQuntity); // call servicess...

        await inserOrder.save();
        res
          .status(200)
          .send({ Status: "Success", Prodcuts: "Order Enterd SuccessFull..." });
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

/**
 * Controller Function For Delete Order Product..
 * @author Patel Ayush
 * @param {String} req
 * @param {String} res
 */
export const deleteProdcut = async (req, res) => {
  console.log("======= Authenticate deleteProdcut Controler. =======");
  try {
    const { id: _id } = req.user;
    const orderId = req.body.orderID;
    if (!orderId) {
      res
        .status(500)
        .send({ Status: "Fail", Message: process.env.EMPTY_ORDERID });
    } else if (!mongoose.Types.ObjectId.isValid(orderId)) {
      res.status(500).send({ Status: "Fail", Message: process.env.ORDER_ID });
    } else {
      const deletedata = await order.findOneAndDelete({
        _id: orderId,
        userId: _id,
      });
      if (!deletedata) {
        res
          .status(400)
          .json({ status: "Fail", Message: process.env.INVALID_TOKEN_ERROR });
      } else {
        console.log(deletedata);
        await inprodcut(deletedata.productId, deletedata.orderQuntity);
        res.status(200).json({
          status: "Success",
          Message: "Order Deleted...",
        });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ Status: "Fail", Message: process.env.SWW });
  }
};

/**
 * Controller Function For Update order...
 * @author Patel Ayush
 * @param {String} req
 * @param {String} res
 */
export const updateOrder = async (req, res) => {
  console.log("======= Authenticate updateOrder Controler. =======");
  try {
    const { id: _id } = req.user;
    const orderId = req.body.orderID;
    const ordetType = req.body.orderType;
    const orderQuntity = req.body.quntity;
    if (!orderId && !ordetType && !orderQuntity) {
      res.status(500).json({
        status: "Fail",
        message: "Please Enter value in orderId ,orderType,quntity  ",
      });
    } else if (!orderId) {
      res
        .status(500)
        .json({ status: "Fail", message: process.env.EMPTY_ORDERID });
    } else if (!mongoose.Types.ObjectId.isValid(orderId)) {
      res.status(500).send({ Status: "Fail", Message: process.env.ORDER_ID });
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
      const findOrder = await order.findById({ _id: orderId });
      if (!findOrder) {
        res.status(404).send({
          status: "Fail",
          Message: "Order Not Exist in System...",
        });
      } else {
        // console.log(findOrder.orderQuntity - orderQuntity);

        if (findOrder.orderQuntity > orderQuntity) {
          // Check new qunetity is less than current order quntity...
          const updateOrder = await order.findOneAndUpdate(
            { _id: orderId, userId: _id },
            {
              $set: { orderType: ordetType, orderQuntity: orderQuntity },
            }
          );
          const diff = findOrder.orderQuntity - orderQuntity; // take diffrance of both...
          await inprodcut(updateOrder.productId, diff);
          if (!updateOrder) {
            res.status(400).send({
              status: "Fail",
              Message: process.env.INVALID_TOKEN_ERROR,
            });
          } else {
            res.status(200).send({
              Status: "Success",
              Message: "Order Updated..",
              OrderId: orderId,
            });
          }
        } else if (findOrder.orderQuntity < orderQuntity) {
          // check new quntity is greate than current order quntity....
          const updateOrder = await order.findOneAndUpdate(
            { _id: orderId, userId: _id },
            {
              $set: { orderType: ordetType, orderQuntity: orderQuntity },
            }
          );
          const diff = orderQuntity - findOrder.orderQuntity; // take diffrence...
          await decprodcut(updateOrder.productId, diff);
          if (!updateOrder) {
            res.status(400).send({
              status: "Fail",
              Message: process.env.INVALID_TOKEN_ERROR,
            });
          } else {
            res.status(200).send({
              Status: "Success",
              Message: "Order Updated..",
              OrderId: orderId,
            });
          }
        } else {
          // check new quntity and current order quntity is equal ...
          const updateOrder = await order.findOneAndUpdate(
            { _id: orderId, userId: _id },
            {
              $set: { orderType: ordetType, orderQuntity: orderQuntity },
            }
          );
          if (!updateOrder) {
            res.status(400).send({
              status: "Fail",
              Message: process.env.INVALID_TOKEN_ERROR,
            });
          } else {
            res.status(200).send({
              Status: "Success",
              Message: "Order Updated..",
              OrderId: orderId,
            });
          }
        }
        // res.status(200).send({ Status: "Success", Order: findOrder });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ Status: "Fail", Message: process.env.SWW });
  }
};

/**
 * Controller Function For Get All Orders..
 * @author Patel Ayush
 * @param {String} req
 * @param {String} res
 */
export const getAllOrder = async (req, res) => {
  console.log("======= Authenticate getAllOrder Controler. =======");
  try {
    const { id: _id } = req.user;
    const allOrder = await order.find({});
    res.status(200).send({ Status: "Success", Orders: allOrder });
  } catch (error) {
    console.log(error);
    res.status(500).send({ Status: "Fail", Message: process.env.SWW });
  }
};
