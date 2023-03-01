const errorHandler = require("../errorHandler");

module.exports = function asyncWrapper(fn) {
  return function (req, res, next) {
    fn(req, res, next).catch((err) => {
      errorHandler(err, res);
    });
  };
};
