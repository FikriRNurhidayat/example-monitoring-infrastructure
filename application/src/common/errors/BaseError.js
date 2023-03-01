class BaseError extends Error {
  constructor(message, statusCode = 422) {
    super(message);
    this.statusCode = 422;
  }

  asJSON() {
    return {
      error: {
        name: this.constructor.name,
        message: this.message,
      },
    };
  }
}

module.exports = BaseError;
