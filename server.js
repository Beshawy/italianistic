const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
const authRoute = require("./routes/authRoute");
const portfolioRoutes = require("./routes/portfolioRoutes");
const statsRoute = require("./routes/statsRoute");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const compression = require("compression");
const hpp = require("hpp");




const app = express();

// Middleware to ensure DB connection
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    next(error);
  }
});

app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(mongoSanitize());
app.use(compression());
app.use(hpp());


const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100 
});
app.use("/api/auth", limiter);

app.get("/", (req, res) => {
  res.send("Server Running ");
});

app.use("/api/auth", authRoute);
app.use("/api/portfolio", portfolioRoutes);
app.use("/api/stats", statsRoute);



// Global Error Handling Middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const status = err.status || "error";

  res.status(statusCode).json({
    status: status,
    message: err.message || "Internal Server Error",
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
});

const PORT = process.env.PORT || 4000;

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;