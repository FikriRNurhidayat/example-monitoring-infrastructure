const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  encryptedPassword: String,
});

const User = mongoose.model("User", userSchema);

User.prototype.asJSON = function asJSON() {
  return {
    id: this._id,
    username: this.username,
  };
};

module.exports = User;
