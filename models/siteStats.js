const mongoose = require("mongoose");

const siteStatsSchema = new mongoose.Schema({
  page: { type: String, required: true, unique: true }, 
  visits: { type: Number, default: 0 },
  lastVisit: { type: Date, default: Date.now }
});

module.exports = mongoose.models.SiteStats || mongoose.model("SiteStats", siteStatsSchema);