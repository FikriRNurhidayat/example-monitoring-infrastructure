const errorHandler = require("../../common/errorHandler");

module.exports = function handleException(err, req, res, next) {
  errorHandler(err, res);
};
