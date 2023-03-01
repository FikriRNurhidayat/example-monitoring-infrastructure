const jwt = require("jsonwebtoken");
const config = require("../../app/config");
const constant = require("../../app/constant");
const { UnauthorizedError, MalformedAccessTokenError } = require("./errors");
const User = require("./model");

function expirationTimeFromNow() {
  return Math.floor((Date.now() / 1000) * config.security.session.expiresIn);
}

class Session {
  constructor({ accessToken, expiredAt, verified = true }) {
    this.accessToken = accessToken;
    this.expiredAt = expiredAt;
    this.verified = verified;
  }

  asJSON() {
    return {
      access_token: this.accessToken,
      expired_at: this.expiredAt.toISOString(),
    };
  }

  async toUser() {
    const user = await User.findById(this.payload.id);
    return user;
  }

  verify() {
    try {
      this.payload = jwt.verify(
        this.accessToken,
        config.security.session.secret
      );
      this.verify = true;
      return this;
    } catch {
      throw new UnauthorizedError();
    }
  }

  static fromJSON(json) {
    return new Session({
      accessToken: this.access_token,
      expiredAt: this.expired_at,
    });
  }

  static fromUser(user) {
    const exp = expirationTimeFromNow();
    const expiredAt = new Date(exp);
    const accessToken = jwt.sign(
      {
        ...user.asJSON(),
        exp,
      },
      config.security.session.secret
    );

    return new Session({
      accessToken,
      expiredAt,
    });
  }

  static fromRequest(req) {
    const accessToken = req.headers.authorization.replace(
      constant.headers.authorization.extractTokenPattern,
      ""
    );
    try {
      const decodedToken = jwt.decode(accessToken);
      const expiredAt = new Date(decodedToken.exp);

      const session = new Session({
        accessToken,
        expiredAt,
        verified: false,
      });

      return session;
    } catch {
      throw new MalformedAccessTokenError();
    }
  }
}

module.exports = Session;
