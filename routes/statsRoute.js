const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { recordVisit, getStats } = require("../controllers/statsController");

const router = express.Router();

router.post("/visit", recordVisit);

router.get("/", protect, getStats);

module.exports = router;