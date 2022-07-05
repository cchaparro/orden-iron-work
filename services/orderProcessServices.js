const ordenRepository = require("../repository/orderProcessRepository");

const gellOrderProcess = (code) => ordenRepository.getOrderProcess(code);
const saveOrderProcess = (order) => ordenRepository.saveOrderProcess(order);
const getOrderProcessByProduct = (valor) =>
  ordenRepository.getScanOrderProcess("kindProduct", valor);
const updateOrderProcess = (order) => ordenRepository.updateOrderProcess(order);

module.exports = {
  gellOrderProcess,
  saveOrderProcess,
  getOrderProcessByProduct,
  updateOrderProcess,
};
