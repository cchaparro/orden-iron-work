const { response, request } = require("express");
const createHTTPError = require("http-errors");
const log = require("serverless-logger")("orderProcessController.js");
const orderProcessServices = require("../services/orderProcessServices");

const getOrderProcess = async (req = request, res = response, next) => {
  const param = req.params.id;

  log("Get order by : ", param);
  try {
    const order = await orderProcessServices.gellOrderProcess(param);
    log("Get order  :", order);

    if (order) {
      res.status(200).send({ "order-process": order });
    }

    if (order === undefined) {
      res.status(404).send(
        createHTTPError(404, "Not fount order-process", {
          expose: false,
        })
      );
    }
  } catch (error) {
    res.status(500).send(createHTTPError(500, error));
  }
};

const getOrderProcessByProduct = async (req = request, res = response) => {
  try {
    const valor = req.params.valor;
    const orders = await orderProcessServices.getOrderProcessByProduct(valor);

    if (orders) {
      res.status(200).send({ "order-process": orders });
    }

    if (orders.Items.Count == 0) {
      res.status(404).send(
        createHTTPError(404, "Not fount order-process", {
          expose: false,
        })
      );
    }
  } catch (error) {
    res.status(500).send(createHTTPError(500, error));
  }
};

const saveOrderProcess = async (req, res = response, next) => {
  try {
    const body = req.body;
    const order = await orderProcessServices.saveOrderProcess(body);

    res.status(200).send({ "order-process": order });
  } catch (error) {
    
    
    if (error.statusCode == 400) {
      log("Error", error);
    }
  
    res.status(500).send(createHTTPError(500, error));
  }
};

const updateOrderProcess = async (req, res = response, next) => {
  try {
    const body = req.body;
    const order = await orderProcessServices.updateOrderProcess(body);

    res.status(200).send({ "order-process": order });
  } catch (error) {
    res.status(500).send(createHTTPError(500, error));
  }
};

module.exports = {
  getOrderProcess,
  saveOrderProcess,
  getOrderProcessByProduct,
  updateOrderProcess,
};
