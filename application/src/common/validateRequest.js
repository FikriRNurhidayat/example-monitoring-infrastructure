const BadRequestError = require("../common/errors/BadRequestError");

module.exports = function validateRequest(validateFunction, ...args) {
  return function (req, res, next) {
    const errors = validateFunction(req);
    const option = args.find((arg) => typeof arg === "object");

    if (!Array.isArray(errors)) {
      const functions = args.filter((arg) => typeof arg === "function");
      if (functions.length > 0) {
        functions.forEach((fn) => fn(req, res, next));
        return;
      }

      next();
      return;
    }

    if (option?.customError) {
      next(option.customError);
      return;
    }

    next(new BadRequestError({ details: errors }));
  };
};
