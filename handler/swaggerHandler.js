const swaggerUi = require('aws-serverless-swagger-ui');

const swaggerHandler = swaggerUi.setup('./conf/swagger-output.yaml');

module.exports.doc = async (event, context, callback) => {
    return (await swaggerHandler)(event, context, callback);
  };
  