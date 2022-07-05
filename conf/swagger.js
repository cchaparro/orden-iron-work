const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "My API",
    description: "Description",
  },
  host: "localhost:3000",
  schemes: ["http"],
};

const outputFile = "./conf/swagger-output.yaml";
const endpointsFiles = ["./handler.js"];
swaggerAutogen(outputFile, endpointsFiles, doc);
