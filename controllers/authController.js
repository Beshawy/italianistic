const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const Admin = require("../models/admin");
const generateToken = require("../utils/generateToken");
const AppError = require("../utils/AppError");


exports.loginAdmin = asyncHandler(async (req, res, next) => {

  const { email, password } = req.body;

  // Sanitize email and log attempt
  const sanitizedEmail = email.trim().toLowerCase();
  
  const admin = await Admin.findOne({ email: sanitizedEmail });

  if (!admin) {
    return next(new AppError("Invalid email or password", 401));
  }

  const isMatch = await bcrypt.compare(password, admin.password);

  if (!isMatch) {
    return next(new AppError("Invalid email or password", 401));
  }

  const token = generateToken(admin._id);

  res.status(200).json({
    status: "success",
    token
  });

});