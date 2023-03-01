const express = require("express");
const router = express.Router();
const {
  validateRegisterRequest,
  validateLoginRequest,
} = require("./validator");
const {
  handleRegisterRequest,
  handleLoginRequest,
  handleVisitRequest,
} = require("./controller");

router.post("/v1/users", validateRegisterRequest, handleRegisterRequest);
router.post("/v1/sessions", validateLoginRequest, handleLoginRequest);
router.post("/v1/guests", handleVisitRequest);

module.exports = router;
