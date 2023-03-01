const BaseError = require("./BaseError");

class BadRequestError extends BaseError {
  constructor({ details }) {
    super("Request payload is invalid.");

    this.details = details;
  }

  asJSON() {
    const json = super.asJSON();
    json.error.details = this.details;
    return json;
  }
}

module.exports = BadRequestError;
