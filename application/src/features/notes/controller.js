const asyncWrapper = require("../../common/middlewares/asyncWrapper");
const Note = require("./model");

module.exports = {
  handleListNotesRequest: asyncWrapper(async (req, res) => {
    const notes = await Note.find({ userId: req.userId }).exec();

    res.status(200).json({
      notes: notes.map((note) => note.asJSON()),
    });
  }),

  handleCreateNoteRequest: asyncWrapper(async (req, res) => {
    const { title, body } = req.body.note;

    const note = await Note.create({
      title,
      body,
      userId: req.userId,
    });

    res.status(201).json({
      note: note.asJSON(),
    });
  }),

  handleUpdateNoteRequest: asyncWrapper(async (req, res) => {
    const { title, body } = req.body.note;
    const { note } = req;

    await note.updateOne({
      title,
      body,
    });

    res.status(200).json({
      note: note.asJSON(),
    });
  }),

  handleGetNoteRequest: asyncWrapper(async (req, res) => {
    res.status(200).json({
      note: req.note.asJSON(),
    });
  }),

  handleDeleteNoteRequest: asyncWrapper(async (req, res) => {
    await Note.deleteOne({ _id: req.params.id });

    res.status(204).end();
  }),
};
