const dynamoose = require("dynamoose");
const ORDER_PROCESS_TABLE = process.env.ORDER_PROCESS_TABLE;

const OrderSchema = new dynamoose.Schema(
  {
    orderId: {
      type: String,
      hashKey: true,
    },

    custumer: String,
    ordenName: String,
    kindProduct: String,
    desing: String,
    size: String,
    color: String,
  },
  {
    saveUnknown: true,
    timestamps: true,
  }
);

const OrderModel = dynamoose.model(ORDER_PROCESS_TABLE, OrderSchema, {
  create: false,
});
module.exports = { OrderModel };
