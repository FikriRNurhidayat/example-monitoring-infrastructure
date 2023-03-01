const express = require("express");
const router = express.Router();

const {
  handleCreateNoteRequest,
  handleUpdateNoteRequest,
  handleDeleteNoteRequest,
  handleGetNoteRequest,
  handleListNotesRequest,
} = require("./controller");
const { setNote } = require("./middleware");
const {
  validateCreateNoteRequest,
  validateUpdateNoteRequest,
  validateDeleteNoteRequest,
  validateGetNoteRequest,
} = require("./validator");
const { authorize } = require("../users/middleware");

router.post(
  "/v1/notes",
  authorize,
  validateCreateNoteRequest,
  handleCreateNoteRequest
);
router.get("/v1/notes", authorize, handleListNotesRequest);
router.put(
  "/v1/notes/:id",
  authorize,
  validateUpdateNoteRequest,
  setNote,
  handleUpdateNoteRequest
);
router.get(
  "/v1/notes/:id",
  authorize,
  validateGetNoteRequest,
  setNote,
  handleGetNoteRequest
);
router.delete(
  "/v1/notes/:id",
  authorize,
  validateDeleteNoteRequest,
  handleDeleteNoteRequest
);

module.exports = router;
