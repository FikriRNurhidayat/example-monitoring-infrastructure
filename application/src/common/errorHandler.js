const BaseError = require("./errors/BaseError");
const InternalServerError = require("./errors/InternalServerError");

module.exports = function errorHandler(err, res) {
  if (err instanceof BaseError) {
    res.status(err.statusCode).json(err.asJSON());
    return;
  }

  console.error(err);

  const internalServerError = new InternalServerError();
  res.status(500).json(internalServerError.asJSON());
};
