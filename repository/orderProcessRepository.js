const dynamoose = require("dynamoose");
const { OrderModel } = require("../repository/schema/orderSchema");

const log = require("serverless-logger")("orderProcessRepository.js");
const IS_OFFLINE = process.env.IS_OFFLINE;

if (IS_OFFLINE === "true") {
  dynamoose.aws.ddb.local("http://localhost:8000");
}

const getOrderProcess = async (code) => {
  const results = await OrderModel.get(code);
  return results;
};

const getScanOrderProcess = async (key, valor) => {
  log("Get order scan:", key ,valor );
  const results = await OrderModel.scan(key).contains(valor).exec();
  return results;
};

const saveOrderProcess = async (order) => {
  log("Save order ", order);
  const orderSave = await OrderModel.create(order);

  return orderSave;
};

const updateOrderProcess = async (order) => {
  const orderSave = await OrderModel.update(order);

  return orderSave;
};

module.exports = {
  getOrderProcess,
  saveOrderProcess,
  getScanOrderProcess,
  updateOrderProcess,
};
