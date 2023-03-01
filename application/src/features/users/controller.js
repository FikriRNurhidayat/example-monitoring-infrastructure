const config = require("../../app/config");
const bcrypt = require("bcrypt");
const asyncWrapper = require("../../common/middlewares/asyncWrapper");
const User = require("./model");
const Session = require("./session");
const {
  UsernameAlreadyTakenError,
  UserNotRegisteredError,
  WrongPasswordError,
  CannotComparePasswordError,
} = require("./errors");

function hashPassword(value) {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(config.security.password.saltRounds, function (err, salt) {
      if (err != null) {
        reject(err);
        return;
      }

      bcrypt.hash(value, salt, function (err, hashedValue) {
        if (err != null) {
          reject(err);
          return;
        }

        resolve(hashedValue);
      });
    });
  });
}

function comparePassword(encryptedPassword, password) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, encryptedPassword, function (err, result) {
      if (err != null) {
        console.error(err);
        reject(new CannotComparePasswordError());
        return;
      }

      resolve(result);
    });
  });
}

module.exports = {
  handleRegisterRequest: asyncWrapper(async (req, res) => {
    const { username, password } = req.body.user;

    // When the username is already taken, then return error
    if (await User.exists({ username }).exec()) {
      throw new UsernameAlreadyTakenError({ username });
    }

    const encryptedPassword = await hashPassword(password);
    const user = await User.create({
      username,
      encryptedPassword,
    });

    const session = await Session.fromUser(user);

    res.status(201).json({ user: user.asJSON(), session: session.asJSON() });
  }),

  handleLoginRequest: asyncWrapper(async (req, res) => {
    const { username, password } = req.body.user;
    const user = await User.findOne({ username }).exec();

    if (!user) throw new UserNotRegisteredError({ username });
    if (!(await comparePassword(user.encryptedPassword, password))) {
      throw new WrongPasswordError({ username });
    }

    const session = Session.fromUser(user);
    res.status(200).json({ user: user.asJSON(), session: session.asJSON() });
  }),

  handleVisitRequest: asyncWrapper(async (req, res) => {
    const user = await User.create({});
    const session = Session.fromUser(user);
    res.status(201).json({ user: user.asJSON(), session: session.asJSON() });
  }),
};
