const AWS = require("aws-sdk");
const log = require("serverless-logger")("orderProcessRepository.js");

const ORDER_PROCESS_TABLE = process.env.ORDER_PROCESS_TABLE;
const IS_OFFLINE = process.env.IS_OFFLINE;
let dynamoDbClient;

if (IS_OFFLINE === "true") {
  dynamoDbClient = new AWS.DynamoDB.DocumentClient({
    region: "localhost",
    endpoint: "http://localhost:8000",
  });
} else {
  dynamoDbClient = new AWS.DynamoDB.DocumentClient();
}

const getOrderProcess = async (code) => {
  const params = {
    TableName: ORDER_PROCESS_TABLE,
    Key: {
      orderId: code,
    },
  };

  const results = await dynamoDbClient.get(params).promise();
  return results.Item;
};

const getScanOrderProcess = async (key,valor) => {
  const params = {
    TableName : ORDER_PROCESS_TABLE,
    FilterExpression : key+' = :valor',
    ExpressionAttributeValues : {':valor' : valor}
  };
  log("Get order scan:" ,params);
  const results = await dynamoDbClient.scan(params).promise();
  return results;
};

const saveOrderProcess = async (order) => {
  log("Save order ", order);

  const params = {
    TableName: ORDER_PROCESS_TABLE,
    Item :order
  };

  await dynamoDbClient.put(params).promise();
  return params.Item;
};

const updateOrderProcess = async (order) => {
  const params = {
    TableName: ORDER_PROCESS_TABLE,
    Item: order
  };

  await dynamoDbClient.update(params).promise();
  return params.Item;
};

module.exports = {
  getOrderProcess,
  saveOrderProcess,
  getScanOrderProcess,
  updateOrderProcess,
};
