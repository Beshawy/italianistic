const express = require("express");

const { loginAdmin } = require("../controllers/authController");

const { loginValidator } = require("../validator/authValidator");

const validatorMiddleware = require("../middleware/validatorMiddleware");

const router = express.Router();

router.post(
  "/login",
  loginValidator,
  validatorMiddleware,
  loginAdmin
);

module.exports = router;