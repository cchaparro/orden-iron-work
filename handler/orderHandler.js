const express = require("express");
const serverless = require("serverless-http");
const  {validarCampos}  = require("../handler/middlewares/valideMiddlewares");

const validator = require("express-joi-validation").createValidator({

  passError: true,
});

const orderProcessController = require("../controller/orderProcessController");

const {
  getOrderByIdSchema,
  saveOrderSchema,
} = require("../handler/validator/orderValidator");

const app = express();

app.use(express.json());

app.get("/hello", async function (req, res) {
  console.log("Consultado Hello");
  res.status(200).json({ error: "Hola mundo" });
});

app.get(
  "/order-process/:id",
  validator.params(getOrderByIdSchema),
  orderProcessController.getOrderProcess
);
app.post(
  "/order-process",
  validator.body(saveOrderSchema),
  orderProcessController.saveOrderProcess
);
app.put("/order-process", orderProcessController.updateOrderProcess);
app.get(
  "/order-process/product/:valor",
  orderProcessController.getOrderProcessByProduct
);

app.use(validarCampos);


module.exports.handler = serverless(app);
