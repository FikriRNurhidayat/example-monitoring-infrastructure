const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  title: String,
  body: String,
  userId: { type: mongoose.Types.ObjectId, ref: "User" },
});

const Note = mongoose.model("Note", noteSchema);

Note.fromJSON = function fromJSON(json) {
  return new Note({
    _id: json._id,
    title: json.title,
    body: json.body,
  });
};

Note.prototype.asJSON = function asJSON() {
  return {
    id: this._id,
    title: this.title,
    body: this.body,
    created_at: this.createdAt,
    update_at: this.updatedAt,
  };
};

module.exports = Note;
