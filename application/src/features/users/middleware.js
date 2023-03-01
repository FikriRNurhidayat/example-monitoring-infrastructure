const asyncWrapper = require("../../common/middlewares/asyncWrapper");
const Session = require("./session");
const { validateAuthorizationHeader } = require("./validator");
const { UserGoneError } = require("./errors");

module.exports = {
  authorize: validateAuthorizationHeader(
    asyncWrapper(async (req, res, next) => {
      const session = Session.fromRequest(req).verify();
      const user = await session.toUser();

      if (!user) throw new UserGoneError();

      req.userId = user.id;
      req.user = user;

      next();
    })
  ),
};
