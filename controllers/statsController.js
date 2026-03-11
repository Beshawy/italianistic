const asyncHandler = require("express-async-handler");
const SiteStats = require("../models/siteStats");

// تسجيل زيارة صفح
const recordVisit = asyncHandler(async (req, res) => {
  const { page } = req.body; 

  if (!page) return res.status(400).json({ status: "fail", message: "Page is required" });

  const stats = await SiteStats.findOneAndUpdate(
    { page },
    { $inc: { visits: 1 }, $set: { lastVisit: new Date() } },
    { upsert: true, new: true }
  );

  res.status(200).json({ status: "success", data: stats });
});


const getStats = asyncHandler(async (req, res) => {
  const stats = await SiteStats.find();
  res.status(200).json({ status: "success", data: stats });
});

module.exports = { recordVisit, getStats };