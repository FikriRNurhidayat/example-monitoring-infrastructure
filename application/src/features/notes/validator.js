const validateRequest = require("../../common/validateRequest");
const Validator = require("fastest-validator");

const noteValidator = new Validator();

const checkCreateNoteRequest = noteValidator.compile({
  note: {
    $$type: "object",
    title: {
      type: "string",
      min: 3,
      max: 255,
    },
    body: {
      type: "string",
      min: 3,
      max: 4096,
    },
  },
});

const checkUpdateNoteRequest = noteValidator.compile({
  note: {
    $$type: "object",
    id: {
      type: "string",
    },
    title: {
      type: "string",
      min: 3,
      max: 255,
      optional: true,
    },
    body: {
      type: "string",
      min: 3,
      max: 4096,
      optional: true,
    },
  },
});

const checkGetNoteRequest = noteValidator.compile({
  note: {
    $$type: "object",
    id: {
      type: "string",
    },
  },
});

const checkDeleteNoteRequest = noteValidator.compile({
  note: {
    $$type: "object",
    id: {
      type: "string",
    },
  },
});

module.exports = {
  validateCreateNoteRequest: validateRequest((req) =>
    checkCreateNoteRequest({
      note: req.body.note,
    })
  ),

  validateUpdateNoteRequest: validateRequest((req) =>
    checkUpdateNoteRequest({
      note: {
        id: req.params.id,
        title: req.body.title,
        body: req.body.body,
      },
    })
  ),

  validateGetNoteRequest: validateRequest((req) =>
    checkGetNoteRequest({
      note: {
        id: req.params.id,
      },
    })
  ),

  validateDeleteNoteRequest: validateRequest((req) =>
    checkDeleteNoteRequest({
      note: {
        id: req.params.id,
      },
    })
  ),
};
