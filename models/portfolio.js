const mongoose = require("mongoose");

const portfolioSchema = new mongoose.Schema({
  title: {
    en: { type: String, required: true },
    ar: { type: String, required: true },
    it: { type: String, required: true },
  },
  description: {
    en: { type: String, required: true },
    ar: { type: String, required: true },
    it: { type: String, required: true },
  },
  image: { type: String, required: true },
  visitorsCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Portfolio", portfolioSchema);