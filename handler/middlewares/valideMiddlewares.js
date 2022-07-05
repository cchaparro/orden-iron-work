const createHTTPError = require("http-errors");
const log = require("serverless-logger")("valideMiddlewares.js");

const validarCampos = (err, req, res, next) => {
  if (err && err.error && err.error.isJoi) {
    res.status(400).send(
      createHTTPError(400, err.error.details[0].message, {
        expose: false,
      })
    );
  } else {
    // pass on to another error handler
    next(err);
  }
};

module.exports = { validarCampos };
