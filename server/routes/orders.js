import express from "express";
import { requireRole } from "../middlewares/auth.js";
import Order from "../models/Order.js";
import ProductOrder from "../models/ProductOrder.js";
import User from "../models/User.js";

import {
  MessageResponse,
  DataResponse,
  Response,
  InternalErrorResponse,
  NotFoundResponse,
  ErrorResponse,
  UnAuthorizedResponse,
} from "../common/reponses.js";
import Delivery from "../models/Delivery.js";
import Product from "../models/Product.js";

const router = express.Router();

router.get("/list_order", requireRole("US"), async (Req, res) => {
  const userId = res.locals.userData.id;

  const order = await Order.findAll({
    where: {
      userId: userId,
    },
  });
  const list = order.map((item) => item.dataValues.id);
  console.log(list);

  // const temp = list.map(async (item) => {
  //   // console.log(item);
  const temp = await ProductOrder.findAll({
    where: {
      orderId: list,
    },
    include: {
      model: Product,
      attributes: ["productName", "price"],
    },
  });

  // const temp = await ProductOrder.findOne({
  //   where: {
  //     orderId: list[0],
  //   },
  //   include: {
  //     model: Product,
  //     attributes: ["productName", "price"],
  //   },
  // });

  console.log(temp);
  res.json(DataResponse(order, temp));
});

router.get("/:id", requireRole("US"), async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const order = await Order.findOne({
      where: {
        id: id,
      },
      include: {
        model: Delivery,
        attributes: ["receiverName", "receiverAddress", "receiverPhone"],
      },
    });

    const product_order = await ProductOrder.findAll({
      where: {
        orderId: id,
      },
      include: {
        model: Product,
        attributes: ["productName", "price"],
      },
    });

    res.json(DataResponse(order, product_order));
  } catch (err) {
    console.log(err);
    res.json(InternalErrorResponse());
  }
});

router.post("/", requireRole("US"), async (req, res) => {
  const orderData = req.body;
  const userId = res.locals.userData.id;

  console.log(
    orderData.Note,
    orderData.deliveryId,
    orderData.paymentMethod,
    orderData.products
  );

  try {
    const order = await Order.create({
      deliveryId: orderData.deliveryId,
      userId: userId,
      note: orderData.Note,
      paymentMethod: orderData.paymentMethod,
    });

    orderData.products.forEach(async (product) => {
      await ProductOrder.create({
        productId: product.id,
        quantity: product.quantity,
        orderId: order.id,
      });
    });

    res.json(
      DataResponse({
        orderId: order.id,
      })
    );
  } catch (err) {
    console.log(err);
    res.json(InternalErrorResponse());
  }
});

export default router;
