const BaseError = require("../../common/errors/BaseError");

class UserNotRegisteredError extends BaseError {
  constructor({ username }) {
    super(
      `User with username '${username}' is not registered in the database.`,
      404
    );
  }
}

class UsernameAlreadyTakenError extends BaseError {
  constructor({ username }) {
    super(`Username '${username}' already taken.`, 422);
  }
}

class CannotComparePasswordError extends BaseError {
  constructor() {
    super("Can't compare password.", 422);
  }
}

class WrongPasswordError extends BaseError {
  constructor({ username }) {
    super(`Invalid password for user '${username}'.`, 422);
  }
}

class UserGoneError extends BaseError {
  constructor() {
    super("User is gone.", 410);
  }
}

class UnauthorizedError extends BaseError {
  constructor(message = "Access token invalid.") {
    super(message, 401);
  }
}

class MalformedAccessTokenError extends BaseError {
  constructor() {
    super("Access token is malformed.", 401);
  }
}

module.exports = {
  UsernameAlreadyTakenError,
  UserNotRegisteredError,
  CannotComparePasswordError,
  WrongPasswordError,
  UserGoneError,
  UnauthorizedError,
  MalformedAccessTokenError,
};
