const BaseError = require("../../common/errors/BaseError");

class RouteNotFoundError extends BaseError {
  constructor({ request }) {
    super(`${request.method} ${request.path} is not registered on the router.`);
  }
}

module.exports = RouteNotFoundError;
