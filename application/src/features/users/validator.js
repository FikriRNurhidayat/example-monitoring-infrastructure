const constant = require("../../app/constant");
const { UnauthorizedError } = require("./errors");
const validateRequest = require("../../common/validateRequest");
const Validator = require("fastest-validator");

const userValidator = new Validator();

userValidator.alias("username", {
  type: "string",
  min: 4,
  max: 30,
  pattern: constant.user.username.pattern,
});

userValidator.alias("bearerToken", {
  type: "string",
  pattern: constant.headers.authorization.pattern,
});

const checkRegisterRequest = userValidator.compile({
  user: {
    $$type: "object",
    username: "username",
    password: {
      type: "string",
      min: 6,
      max: 256,
    },
  },
});

const checkLoginRequest = userValidator.compile({
  user: {
    $$type: "object",
    username: "username",
    password: {
      type: "string",
      min: 6,
      max: 256,
    },
  },
});

const checkHeaderForAuthorization = userValidator.compile({
  authorization: {
    type: "bearerToken",
  },
});

module.exports = {
  validateRegisterRequest: validateRequest((req) =>
    checkRegisterRequest({
      user: req.body.user,
    })
  ),

  validateLoginRequest: validateRequest((req) =>
    checkLoginRequest({
      user: req.body.user,
    })
  ),

  validateAuthorizationHeader: (fn) =>
    validateRequest((req) => checkHeaderForAuthorization(req.headers), fn, {
      customError: new UnauthorizedError("Access token is required."),
    }),
};
