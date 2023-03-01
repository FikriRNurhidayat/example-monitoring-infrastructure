const BaseError = require("./BaseError");

class InternalServerError extends BaseError {
  constructor() {
    super("Internal server error. Please contact info@biteship.com.");
  }
}

module.exports = InternalServerError;
