const Note = require("./model");

module.exports = {
  async setNote(req, res, next) {
    const note = await Note.findOne({
      _id: req.params.id,
      userId: req.userId,
    }).exec();

    if (!note) {
      res.status(404).json({
        error: {
          name: "NoteNotFoundError",
          message: "Note is not found.",
        },
      });
      return;
    }

    req.note = note;

    next();
  },
};
