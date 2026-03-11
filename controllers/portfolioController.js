const asyncHandler = require("express-async-handler");
const Portfolio = require("../models/portfolio");
const AppError = require("../utils/AppError");
const { createPortfolioSchema, updatePortfolioSchema } = require("../validator/portfolioValidator");

// Create Portfolio مع رفع صورة
const createPortfolio = asyncHandler(async (req, res) => {
  const { error } = createPortfolioSchema.validate(req.body);
  if (error) throw new AppError(error.details[0].message, 400);

  if (!req.file) throw new AppError("Image is required", 400); 

  const portfolio = await Portfolio.create({
    title: req.body.title,
    description: req.body.description,
    image: req.file.path 
  });

  res.status(201).json({ status: "success", data: portfolio });
});

// Read All
const getAllPortfolios = asyncHandler(async (req, res) => {
  const portfolios = await Portfolio.find();
  res.status(200).json({ status: "success", data: portfolios });
});

// Read One
const getPortfolio = asyncHandler(async (req, res) => {
  const portfolio = await Portfolio.findById(req.params.id);
  if (!portfolio) throw new AppError("Portfolio not found", 404);

  // زود الvisitorsCount
  portfolio.visitorsCount += 1;
  await portfolio.save();

  res.status(200).json({ status: "success", data: portfolio });
});

// Update Portfolio مع إمكانية تغيير الصورة
const updatePortfolio = asyncHandler(async (req, res) => {
  const { error } = updatePortfolioSchema.validate(req.body);
  if (error) throw new AppError(error.details[0].message, 400);

  const updateData = {
    title: req.body.title,
    description: req.body.description
  };

  // لو رفع Admin صورة جديدة
  if (req.file) {
    updateData.image = req.file.path;
  }

  const portfolio = await Portfolio.findByIdAndUpdate(req.params.id, updateData, {
    new: true,
    runValidators: true
  });

  if (!portfolio) throw new AppError("Portfolio not found", 404);
  res.status(200).json({ status: "success", data: portfolio });
});

// Delete
const deletePortfolio = asyncHandler(async (req, res) => {
  const portfolio = await Portfolio.findByIdAndDelete(req.params.id);
  if (!portfolio) throw new AppError("Portfolio not found", 404);
  res.status(204).json({ status: "success", data: null });
});

module.exports = { createPortfolio, getAllPortfolios, getPortfolio, updatePortfolio, deletePortfolio };