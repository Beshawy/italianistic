const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware"); 
const {
  createPortfolio,
  getAllPortfolios,
  getPortfolio,
  updatePortfolio,
  deletePortfolio
} = require("../controllers/portfolioController");

const router = express.Router();


router.get("/", getAllPortfolios);
router.get("/:id", getPortfolio);

// Protected: Admin فقط - رفع الصور مع البيانا
router.post("/", protect, upload.single("image"), createPortfolio); // الحقل "image" لازم يطابق اسم الفيلد في FormData
router.put("/:id", protect, upload.single("image"), updatePortfolio);
router.delete("/:id", protect, deletePortfolio);

module.exports = router;